/**requestController.js
 * 
 * description: controller functions for CRUD operations on requests
 * 
 */

const Request = require('../models/Request.js');

// GET all requests
exports.getAllRequests = async (request, response) => {
  try {
    const requests = await Request.find()
      .populate('createdBy', 'username email phone')
      .populate('claimedBy', 'username email phone');
    response.status(200).json(requests);
  } catch (error) {
    response.status(500).json({ message: 'Error fetching requests', error: error.message });
  }
};

// GET a single request by ID
exports.getRequestById = async (request, response) => {
  try {
    const requestData = await Request.findById(request.params.id)
      .populate('createdBy', 'username email phone')
      .populate('claimedBy', 'username email phone');
    if (!requestData) {
      return response.status(404).json({ message: 'Request not found' });
    }
    response.status(200).json(requestData);
  } catch (error) {
    response.status(500).json({ message: 'Error fetching request', error: error.message });
  }
};

// POST create a new request (protected - must be logged in)
exports.createRequest = async (request, response) => {
  try {
    const newRequest = new Request({
      title: request.body.title,
      description: request.body.description,
      category: request.body.category,
      location: request.body.location,
      createdBy: request.user.userId, // from auth middleware
      status: 'Open'
    });

    const savedRequest = await newRequest.save();
    
    // populate user info before returning
    await savedRequest.populate('createdBy', 'username email phone');
    
    response.status(201).json(savedRequest);
  } catch (error) {
    response.status(400).json({ message: 'Error creating request', error: error.message });
  }
};

// PUT claim a request (protected - must be logged in)
exports.claimRequest = async (request, response) => {
  try {
    const requestData = await Request.findById(request.params.id);
    
    if (!requestData) {
      return response.status(404).json({ message: 'Request not found' });
    }

    if (requestData.status !== 'Open') {
      return response.status(400).json({ message: 'Request is not available to claim' });
    }

    requestData.status = 'Claimed';
    requestData.claimedBy = request.user.userId; // from auth middleware
    requestData.claimedTimestamp = new Date();

    const updatedRequest = await requestData.save();
    await updatedRequest.populate('createdBy', 'username email phone');
    await updatedRequest.populate('claimedBy', 'username email phone');
    
    response.status(200).json(updatedRequest);
  } catch (error) {
    response.status(400).json({ message: 'Error claiming request', error: error.message });
  }
};

// PUT mark request as complete (protected - must be the helper who claimed it)
exports.completeRequest = async (request, response) => {
  try {
    const requestData = await Request.findById(request.params.id);
    
    if (!requestData) {
      return response.status(404).json({ message: 'Request not found' });
    }

    if (requestData.status !== 'Claimed') {
      return response.status(400).json({ message: 'Request must be claimed before completing' });
    }

    // check if user is the one who claimed it
    if (requestData.claimedBy.toString() !== request.user.userId) {
      return response.status(403).json({ message: 'Only the helper who claimed this request can mark it complete' });
    }

    requestData.status = 'Completed';
    requestData.completedTimestamp = new Date();

    const updatedRequest = await requestData.save();
    await updatedRequest.populate('createdBy', 'username email phone');
    await updatedRequest.populate('claimedBy', 'username email phone');
    
    response.status(200).json(updatedRequest);
  } catch (error) {
    response.status(400).json({ message: 'Error completing request', error: error.message });
  }
};

// PUT update a request (protected - must be creator or admin)
exports.updateRequest = async (request, response) => {
  try {
    const requestData = await Request.findById(request.params.id);
    
    if (!requestData) {
      return response.status(404).json({ message: 'Request not found' });
    }

    // check ownership or admin
    const isOwner = requestData.createdBy.toString() === request.user.userId;
    const isAdmin = request.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return response.status(403).json({ message: 'You do not have permission to edit this request' });
    }

    // update allowed fields
    if (request.body.title) requestData.title = request.body.title;
    if (request.body.description) requestData.description = request.body.description;
    if (request.body.category) requestData.category = request.body.category;
    if (request.body.location) requestData.location = request.body.location;

    const updatedRequest = await requestData.save();
    await updatedRequest.populate('createdBy', 'username email phone');
    await updatedRequest.populate('claimedBy', 'username email phone');
    
    response.status(200).json(updatedRequest);
  } catch (error) {
    response.status(400).json({ message: 'Error updating request', error: error.message });
  }
};

// DELETE a request (protected - must be creator or admin)
exports.deleteRequest = async (request, response) => {
  try {
    const requestData = await Request.findById(request.params.id);
    
    if (!requestData) {
      return response.status(404).json({ message: 'Request not found' });
    }

    // check ownership or admin
    const isOwner = requestData.createdBy.toString() === request.user.userId;
    const isAdmin = request.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return response.status(403).json({ message: 'You do not have permission to delete this request' });
    }

    await Request.findByIdAndDelete(request.params.id);
    response.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    response.status(500).json({ message: 'Error deleting request', error: error.message });
  }
};