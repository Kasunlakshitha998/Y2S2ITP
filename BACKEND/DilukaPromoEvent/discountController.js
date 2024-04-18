const Discount = require("../models/Discount");
const PromoEvent = require("../models/PromoEvent");
const { z } = require("zod");

const createDiscountSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  percentage: z.number().min(1),
});

const discountController = {
  // create discount
  createDiscount: async (req, res) => {
    try {
      const { title, description, image, percentage } = req.body;
      const userId = req.userId;

      // validation
      createDiscountSchema.parse(req.body);

      const newDiscount = new Discount({
        title,
        description,
        image,
        percentage,
      });

      const savedDiscount = await newDiscount.save();

      res.status(201).json({
        success: true,
        discount: savedDiscount,
        message: "Discount created successfully",
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

  // get all discounts
  getDiscounts: async (req, res) => {
    try {
      const discounts = await Discount.find();

      res.status(200).json({ success: true, discounts });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get discount by id
  getDiscountById: async (req, res) => {
    try {
      const discountId = req.params.id;
      const discount = await Discount.findById(discountId);

      if (!discount) {
        return res.status(404).json({
          success: false,
          message: "Discount not found",
        });
      }

      res.status(200).json({ success: true, discount });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // update discount
  updateDiscount: async (req, res) => {
    try {
      const discountId = req.params.id;
      const discount = await Discount.findById(discountId);

      if (!discount) {
        return res.status(404).json({
          success: false,
          message: "Discount not found",
        });
      }

      const updatedDiscount = await Discount.findByIdAndUpdate(
        discountId,
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json({
        success: true,
        discount: updatedDiscount,
        message: "Discount updated successfully",
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

  // delete discount
  deleteDiscount: async (req, res) => {
    try {
      const discountId = req.params.id;

      const discount = await Discount.findById(discountId);

      if (!discount) {
        return res.status(404).json({
          success: false,
          message: "Discount not found",
        });
      }

      // check if there are any promoEvents using this discount
      const promoEvents = await PromoEvent.find({ discount: discountId });

      if (promoEvents.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Cannot delete discount. It is being used in promo events",
        });
      }

      const deletedDiscount = await Discount.findByIdAndDelete(discountId);

      res.status(200).json({
        success: true,
        discount: deletedDiscount,
        message: "Discount deleted successfully",
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

  // get discounts count using aggregation
  getDiscountsCount: async (req, res) => {
    try {
      const discountsCount = await Discount.aggregate([
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]);

      res
        .status(200)
        .json({ success: true, count: discountsCount[0]?.count || 0 });
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

module.exports = discountController;
