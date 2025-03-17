const FusionGroup = require('../models/fusionGroup');
const FusionUser = require('../models/fusionUser');

// Create a new group
const createGroup = async (req, res) => {
    try {
        const { u_id, name, description,tag } = req.body;
        if (!u_id || !name) {
            return res.status(400).json({ message: "User ID and group name are required" });
        }

        const newGroup = new FusionGroup({
            name,
            description,
            members: [u_id],
            createdBy: u_id,
            tag
        });

        await newGroup.save();
        return res.status(201).json({ message: "Group created successfully", group: newGroup });
    } catch (error) {
        return res.status(500).json({ message: "Error creating group", error: error.message });
    }
};

// Get all groups
const getAllGroups = async (req, res) => {
    try {
        const groups = await FusionGroup.find();
        return res.status(200).json(groups);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching groups", error: error.message });
    }
};

// Get a specific group by ID
const getGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const group = await FusionGroup.findById(groupId);

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        return res.status(200).json(group);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching group", error: error.message });
    }
};

// Join a group
const joinGroup = async (req, res) => {
    try {
        const { u_id, groupId } = req.body;
        if (!u_id || !groupId) {
            return res.status(400).json({ message: "User ID and group ID are required" });
        }

        const group = await FusionGroup.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        if (group.members.includes(u_id)) {
            return res.status(400).json({ message: "User is already a member of this group" });
        }

        group.members.push(u_id);
        await group.save();

        return res.status(200).json({ message: "Joined group successfully", group });
    } catch (error) {
        return res.status(500).json({ message: "Error joining group", error: error.message });
    }
};

module.exports = { createGroup, getAllGroups, getGroup, joinGroup };
