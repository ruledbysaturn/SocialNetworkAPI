// const router = require('express').Router();
// const thoughtController = require('../../controllers/thought-controller');

// const {
//     getThoughts,
//     getSingleThought,
//     createThought,
//     updateThought,
//     deleteThought,
//     addReaction,
//     deleteReaction
// } = require('../../controllers/thought-controller');

// router.route('/').get(thoughtController.getThoughts).post(thoughtController.createThought);
// router.route('/:thoughtId').get(thoughtController.getSingleThought).put(thoughtController.updateThought).delete(thoughtController.deleteThought);
// router.route('/:thoughtId/reactions').post(thoughtController.addReaction);
// router.route('/:thoughtId/reactions/:reactionId').delete(thoughtController.deleteReaction);

// module.exports = router;
const router = require('express').Router();
const thoughtController = require('../../controllers/thought-controller');

router.route('/')
  .get(thoughtController.getAllThoughts)
  .post(thoughtController.createThought);

router.route('/:thoughtId')
  .get(thoughtController.getSingleThought)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

router.route('/:thoughtId/reactions')
  .post(thoughtController.addReaction);

router.route('/:thoughtId/reactions/:reactionId')
  .delete(thoughtController.deleteReaction);

module.exports = router;
