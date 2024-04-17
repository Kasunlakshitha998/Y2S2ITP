const USER_ROLES = require("../constants/roles");
const PromoEvent = require("../models/PromoEvent");
const User = require("../models/User");
const { z } = require("zod");

const createPromoEventSchema = z.object({
  category: z.enum(["event", "promotion"]),
  details: z.string().min(1),
  priceRange: z.string().min(1),
  validity: z.string().min(1),
  discount: z.string().optional(),
  image: z.string().min(1),
});

const promoEventController = {
  // create promoEvent
  createPromoEvent: async (req, res) => {
    try {
      const userId = req.userId;

      // validation
      createPromoEventSchema.parse(req.body);

      // if user is PE_MANAGER, set status to active if user is EA_MANAGER, set status to pending
      const user = await User.findById(userId);
      let status = "pending";
      if (user.role === USER_ROLES.PE_MANAGER) {
        status = "active";
      } else if (user.role === USER_ROLES.EA_MANAGER) {
        status = "pending";
      } else {
        return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
      }

      // if discount = "", remove discount field
      if (req.body.discount === "") {
        delete req.body.discount;
      }

      const newPromoEvent = new PromoEvent({
        ...req.body,
        status,
      });

      const savedPromoEvent = await newPromoEvent.save();

      res.status(201).json({
        success: true,
        promoEvent: savedPromoEvent,
        message: "PromoEvent created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get all promoEvents
  getPromoEvents: async (req, res) => {
    try {
      const promoEvents = await PromoEvent.find().populate("discount");

      res.status(200).json({ success: true, promoEvents });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get all active promoEvents
  getActivePromoEvents: async (req, res) => {
    try {
      const promoEvents = await PromoEvent.find({ status: "active" }).populate(
        "discount"
      );

      res.status(200).json({ success: true, promoEvents });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get promoEvent by id
  getPromoEventById: async (req, res) => {
    try {
      const promoEventId = req.params.id;
      const promoEvent = await PromoEvent.findById(promoEventId).populate(
        "discount"
      );

      if (!promoEvent) {
        return res.status(404).json({
          success: false,
          message: "PromoEvent not found",
        });
      }

      res.status(200).json({ success: true, promoEvent });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // update promoEvent
  updatePromoEvent: async (req, res) => {
    try {
      const promoEventId = req.params.id;
      const promoEvent = await PromoEvent.findById(promoEventId);

      if (!promoEvent) {
        return res.status(404).json({
          success: false,
          message: "PromoEvent not found",
        });
      }

      let updatedPromoEvent;
      // if discount is present, update the discount field else remove the discount field
      if (req.body.discount) {
        updatedPromoEvent = await PromoEvent.findByIdAndUpdate(
          promoEventId,
          req.body,
          {
            new: true,
          }
        );
      } else {
        updatedPromoEvent = await PromoEvent.findByIdAndUpdate(
          promoEventId,
          { ...req.body, discount: null },
          {
            new: true,
          }
        );
      }

      res.status(200).json({
        success: true,
        promoEvent: updatedPromoEvent,
        message: "PromoEvent updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // delete promoEvent
  deletePromoEvent: async (req, res) => {
    try {
      const promoEventId = req.params.id;

      const promoEvent = await PromoEvent.findById(promoEventId);

      if (!promoEvent) {
        return res.status(404).json({
          success: false,
          message: "PromoEvent not found",
        });
      }

      const deletedPromoEvent = await PromoEvent.findByIdAndDelete(
        promoEventId
      );

      res.status(200).json({
        success: true,
        promoEvent: deletedPromoEvent,
        message: "PromoEvent deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get promoEvents count using aggregation
  getPromoEventsCount: async (req, res) => {
    try {
      const promoEventsCount = await PromoEvent.aggregate([
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]);

      res
        .status(200)
        .json({ success: true, count: promoEventsCount[0]?.count || 0 });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },
};

module.exports = promoEventController;


module.exports = promoEventController;
