const { Thought, User } = require('../models');

const thoughtController = {
    //get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughtData = await Thought.find().select('-__v');
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //get single thought
    async getSingleThought(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //create thought
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            const userData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughtData._id } },
                { new: true }
            );
            res.json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
},
//updating thought
async updateThought(req, res) {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!thoughtData) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
},
//deleting thought
// async deleteThought(req, res) {
//     try {
//         const thoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
//         if (!thoughtData) {
//             return res.status(404).json({ message: 'No thought with that ID' });
//         }
//         const userData = await User.findOneAndUpdate(
//             { thoughts: req.params.thoughtId },
//             { $pull: { thoughts: req.params.thoughtId } },
//             { new: true }
//         );
//         res.status(200).json({ message: 'Thought deleted' });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// },

async deleteThought(req, res) {
    try {
        console.log('Deleting thought:', req.params);
        const thoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
        console.log('Thought data:', thoughtData);

        if (!thoughtData) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        const userData = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        );
        console.log('User data:', userData);

        res.status(200).json({ message: 'Thought deleted' });
    } catch (err) {
        console.error('Error deleting thought:', err);
        res.status(500).json(err);
    }
},


//adding reaction to thought
async addReaction(req, res) {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );
        if (!thoughtData) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
},
//deleting a reaction from thought
async deleteReaction(req, res) {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );
        if (!thoughtData) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
},
}
module.exports = thoughtController;

