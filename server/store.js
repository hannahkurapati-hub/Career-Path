import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defaultProfiles } from './data/defaultProfiles.js';
import { Profile } from './models/Profile.js';
import { isMongoConnected } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'data', 'db.json');

class Store {
  constructor() {
    this.profiles = [];
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_PATH)) {
        const raw = fs.readFileSync(DB_PATH, 'utf-8');
        this.profiles = JSON.parse(raw);
      } else {
        this.profiles = JSON.parse(JSON.stringify(defaultProfiles));
        this.persist();
      }
    } catch (err) {
      console.error('Error reading db.json, falling back to defaults:', err);
      this.profiles = JSON.parse(JSON.stringify(defaultProfiles));
    }
  }

  async syncWithMongoDB() {
    if (!isMongoConnected()) return;
    try {
      const count = await Profile.countDocuments();
      if (count === 0) {
        // Seed MongoDB from default / current profiles
        const seedData = this.profiles.length > 0 ? this.profiles : defaultProfiles;
        await Profile.insertMany(seedData);
        console.log(`🍃 Seeded MongoDB Atlas with ${seedData.length} profiles.`);
      } else {
        // Load latest profiles from MongoDB
        const mongoProfiles = await Profile.find({}).lean();
        if (mongoProfiles && mongoProfiles.length > 0) {
          this.profiles = mongoProfiles.map(p => {
            const { _id, __v, createdAt, updatedAt, ...rest } = p;
            return rest;
          });
          this.persist();
          console.log(`🍃 Synced ${this.profiles.length} profiles from MongoDB Atlas.`);
        }
      }
    } catch (err) {
      console.error('Error syncing with MongoDB Atlas:', err.message);
    }
  }

  persist() {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(this.profiles, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write db.json:', err);
    }
  }

  async saveToMongo(profile) {
    if (!isMongoConnected()) return;
    try {
      await Profile.findOneAndUpdate(
        { id: profile.id },
        { $set: profile },
        { upsert: true, new: true }
      );
    } catch (err) {
      console.error(`Failed to persist profile ${profile.id} to MongoDB:`, err.message);
    }
  }

  getProfiles() {
    return this.profiles;
  }

  getProfileById(id) {
    return this.profiles.find(p => p.id === id) || null;
  }

  createProfile(profileData) {
    const newProfile = {
      id: `profile-${Date.now()}`,
      avatar: profileData.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(profileData.name || 'Student')}`,
      skills: [],
      interests: [],
      projects: [],
      certifications: [],
      completedMilestones: [],
      ...profileData
    };
    this.profiles.push(newProfile);
    this.persist();
    this.saveToMongo(newProfile);
    return newProfile;
  }

  updateProfile(id, updates) {
    const idx = this.profiles.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.profiles[idx] = { ...this.profiles[idx], ...updates };
    this.persist();
    this.saveToMongo(this.profiles[idx]);
    return this.profiles[idx];
  }

  toggleMilestone(profileId, milestoneId) {
    const profile = this.getProfileById(profileId);
    if (!profile) return null;
    if (!profile.completedMilestones) profile.completedMilestones = [];
    
    const exists = profile.completedMilestones.includes(milestoneId);
    if (exists) {
      profile.completedMilestones = profile.completedMilestones.filter(m => m !== milestoneId);
    } else {
      profile.completedMilestones.push(milestoneId);
    }
    this.persist();
    this.saveToMongo(profile);
    return profile;
  }

  addProject(profileId, project) {
    const profile = this.getProfileById(profileId);
    if (!profile) return null;
    const newProject = {
      id: `proj-${Date.now()}`,
      ...project
    };
    profile.projects.unshift(newProject);
    this.persist();
    this.saveToMongo(profile);
    return profile;
  }

  deleteProject(profileId, projectId) {
    const profile = this.getProfileById(profileId);
    if (!profile) return null;
    profile.projects = profile.projects.filter(p => p.id !== projectId);
    this.persist();
    this.saveToMongo(profile);
    return profile;
  }

  addCertification(profileId, cert) {
    const profile = this.getProfileById(profileId);
    if (!profile) return null;
    const newCert = {
      id: `cert-${Date.now()}`,
      ...cert
    };
    profile.certifications.unshift(newCert);
    this.persist();
    this.saveToMongo(profile);
    return profile;
  }

  deleteCertification(profileId, certId) {
    const profile = this.getProfileById(profileId);
    if (!profile) return null;
    profile.certifications = profile.certifications.filter(c => c.id !== certId);
    this.persist();
    this.saveToMongo(profile);
    return profile;
  }

  async resetToDefaults() {
    this.profiles = JSON.parse(JSON.stringify(defaultProfiles));
    this.persist();
    if (isMongoConnected()) {
      try {
        await Profile.deleteMany({});
        await Profile.insertMany(this.profiles);
      } catch (err) {
        console.error('Failed to reset MongoDB profiles:', err.message);
      }
    }
    return this.profiles;
  }
}

export const store = new Store();
