import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  techStack: [{ type: String }],
  githubUrl: { type: String },
  liveUrl: { type: String },
  impact: { type: String }
}, { _id: false });

const CertificationSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  issuer: { type: String },
  issueDate: { type: String },
  credentialUrl: { type: String },
  skills: [{ type: String }]
}, { _id: false });

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' },
  category: { type: String }
}, { _id: false });

const ProfileSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  avatar: { type: String },
  degree: { type: String, required: true },
  university: { type: String },
  year: { type: String },
  gpa: { type: String },
  targetCareerId: { type: String },
  bio: { type: String },
  skills: [SkillSchema],
  interests: [{ type: String }],
  projects: [ProjectSchema],
  certifications: [CertificationSchema],
  completedMilestones: [{ type: String }]
}, { timestamps: true });

export const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
