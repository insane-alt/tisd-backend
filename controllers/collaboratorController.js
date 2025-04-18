const { User, Collaborator } = require('../models');

// Create new collaborator
exports.createCollaborator = async (req, res) => {
  try {
    const { username, email, password, organization, role, expertise, projects } = req.body;

    // Create user first
    const user = await User.create({
      username,
      email,
      password,
      userType: 'collaborator'
    });

    // Create collaborator profile
    const collaborator = await Collaborator.create({
      userId: user.id,
      organization,
      role,
      expertise,
      projects: projects || []
    });

    res.status(201).json({ user, collaborator });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all collaborators
exports.getAllCollaborators = async (req, res) => {
  try {
    const collaborators = await Collaborator.findAll({
      include: [{
        model: User,
        attributes: { exclude: ['password'] }
      }]
    });

    res.json(collaborators);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update collaborator's projects
exports.updateProjects = async (req, res) => {
  try {
    const { collaboratorId } = req.params;
    const { projects } = req.body;

    const collaborator = await Collaborator.findByPk(collaboratorId);
    if (!collaborator) {
      return res.status(404).json({ message: 'Collaborator not found' });
    }

    collaborator.projects = projects;
    await collaborator.save();

    res.json({ message: 'Projects updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add project to collaborator
exports.addProject = async (req, res) => {
  try {
    const { collaboratorId } = req.params;
    const { project } = req.body;

    const collaborator = await Collaborator.findByPk(collaboratorId);
    if (!collaborator) {
      return res.status(404).json({ message: 'Collaborator not found' });
    }

    collaborator.projects = [...collaborator.projects, project];
    await collaborator.save();

    res.json({ message: 'Project added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}; 