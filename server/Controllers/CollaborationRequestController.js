const CollaborationRequest = require("../Model/model.collaborationRequest.js");

module.exports = {
  async sendRequest(req, res) {
    const { senderId, recipientId, recipientName, message, status } = req.body;

    try {
      // Create a collaboration request
      const request = new CollaborationRequest({
        sender: senderId,
        recipient: recipientId,
        message,
        status,
      });

      // Save the request to the database
      await request.save();

      res.status(201).json({
        success: true,
        message: "Collaboration request sent successfully",
        request,
      });
    } catch (error) {
      console.error("Error sending collaboration request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getRequestsForUser(req, res) {
    const { userId } = req.params;

    try {
      // Find all collaboration requests for the user
      const requests = await CollaborationRequest.find({ recipient: userId })
        .populate("sender", "username")
        .populate("recipient", "username");

      // Map the requests to include recipientName
      const requestsWithRecipientName = requests.map((request) => ({
        _id: request._id,
        sender: request.sender,
        recipient: request.recipient,
        recipientName: request.recipient.username,
        message: request.message,
        status: request.status,
        createdAt: request.createdAt,
      }));

      res.status(200).json({
        success: true,
        requests: requestsWithRecipientName,
      });
    } catch (error) {
      console.error("Error fetching collaboration requests:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async respondToRequest(req, res) {
    const { requestId, response } = req.body;

    // Input validation
    if (
      !requestId ||
      !response ||
      (response !== "Accept" && response !== "Decline")
    ) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    try {
      // Find the request by ID
      const request = await CollaborationRequest.findById(requestId);

      // Check if request exists
      if (!request) {
        return res
          .status(404)
          .json({ error: "Collaboration request not found" });
      }

      // Update request status based on response
      if (response === "Accept") {
        request.status = "Accepted";
      } else if (response === "Decline") {
        request.status = "Declined";
      }

      // Save the updated request
      await request.save();

      res.status(200).json({
        success: true,
        message: "Collaboration request responded to successfully",
        request,
      });
    } catch (error) {
      console.error("Error responding to collaboration request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
