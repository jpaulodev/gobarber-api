import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id },
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
