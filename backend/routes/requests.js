/**requests.js
 * 
 * description: route definitions for the requests resource
 * 
 */

const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');

// public routes (no auth required)
// GET all requests
router.get('/', requestController.getAllRequests);

// GET a single request by ID
router.get('/:id', requestController.getRequestById);

// protected routes (auth required)
// POST a new request
router.post('/', authMiddleware, requestController.createRequest);

// PUT claim a request
router.put('/:id/claim', authMiddleware, requestController.claimRequest);

// PUT mark request as complete
router.put('/:id/complete', authMiddleware, requestController.completeRequest);

// PUT update a request
router.put('/:id', authMiddleware, requestController.updateRequest);

// DELETE a request
router.delete('/:id', authMiddleware, requestController.deleteRequest);

module.exports = router;