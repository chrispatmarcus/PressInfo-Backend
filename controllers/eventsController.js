const asyncHandler = require("express-async-handler");
const Event = require("../models/eventsModel");

// @desc Get all Events
// @route GET /api/event
// @access Private
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();
  res.status(200).json(events);
});

// @desc Get Events by Section Type (e.g., Presbytery or Congregation)
// @route GET /api/event/:sectionType
// @access Private
const getEventsBySection = asyncHandler(async (req, res) => {
  const { sectionType } = req.params;
  const events = await Event.find({ sectionType }); // Filtering by sectionType
  if (!events) {
    res.status(404);
    throw new Error("No events found for this section");
  }
  res.status(200).json(events);
});

// @desc Create a new Event
// @route POST /api/event
// @access Private
const createEvent = async (req, res) => {
  try {
    console.log("===> Hitting createEvent endpoint");
    console.log("===> Title:", req.body.title);
    console.log("===> Description:", req.body.description);
    console.log("===> SectionType:", req.body.sectionType); // Capture sectionType
    console.log("===> SectionName:", req.body.sectionName); // Capture sectionName
    console.log("===> File:", req.file);

    // const event = await Event.create({
    //   title: req.body.title,
    //   imagePath: req.file.path,
    //   description: req.body.description,
    //   sectionType: req.body.sectionType, // Store section type
    //   sectionName: req.body.sectionName, // Store section name
    // });
    const event = await Event.create({
      title: req.body.title,
      description: req.body.description,
      sectionType: req.body.sectionType,
      sectionName: req.body.sectionName,
      imagePaths: req.files.map((file) => file.path), // map all file paths
    });

    console.log("===> Event saved:", event);

    res.status(201).json(event);
  } catch (error) {
    console.error("===> Error creating event:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Update Event
// @route PUT /api/event/:id
// @access Private
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  const updatedData = { ...req.body };
  if (req.file) {
    updatedData.imagePath = req.file.path;
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    updatedData,
    {
      new: true,
    }
  );

  res.status(200).json(updatedEvent);
});

// @desc Delete Event
// @route DELETE /api/event/:id
// @access Private
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  await Event.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Event deleted successfully" });
});

module.exports = {
  getEvents,
  getEventsBySection,
  createEvent,
  updateEvent,
  deleteEvent,
};

// const asyncHandler = require("express-async-handler");
// const Event = require("../models/eventsModel");

// // @desc Get all Events
// // @route GET /api/event
// // @access Private
// const getEvents = asyncHandler(async (req, res) => {
//   const events = await Event.find();
//   res.status(200).json(events);
// });

// // @desc Get a single Event
// // @route GET /api/event/:id
// // @access Private
// const getEvent = asyncHandler(async (req, res) => {
//   const event = await Event.findById(req.params.id);
//   if (!event) {
//     res.status(404);
//     throw new Error("Event not found");
//   }
//   res.status(200).json(event);
// });

// // @desc Create a new Event
// // @route POST /api/event
// // @access Private
// // const createEvent = async (req, res) => {
// //   if (!req.file) {
// //     res.status(400);
// //     throw new Error("Image upload is required");
// //   }

// //   const { title, description } = req.body;

// //   const event = await Event.create({
// //     title,
// //     imagePath: req.file.path,
// //     description,
// //   });

// //   res.status(201).json(event);
// // };
// // const createEvent = async (req, res) => {
// //   try {
// //     console.log("====> POST /api/events hit"); // Step 1

// //     if (!req.file) {
// //       console.log("====> No file uploaded");
// //       return res.status(400).json({ message: "Image upload is required" });
// //     }

// //     const { title, description } = req.body;
// //     console.log("====> Title:", title); // Step 2
// //     console.log("====> Description:", description); // Step 3
// //     console.log("====> File Path:", req.file.path); // Step 4

// //     // // Temporarily skip DB call
// //     // return res.status(201).json({
// //     //   title,
// //     //   description,
// //     //   imagePath: req.file.path,
// //     // });

// //     const event = await Event.create({
// //       title,
// //       imagePath: req.file.path,
// //       description,
// //     });

// //     res.status(201).json(event);
// //   } catch (error) {
// //     console.error("====> Error in createEvent:", error.message); // Step 5
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };
// const createEvent = async (req, res) => {
//   try {
//     console.log("===> Hitting createEvent endpoint");
//     console.log("===> Title:", req.body.title);
//     console.log("===> Description:", req.body.description);
//     console.log("===> File:", req.file);

//     const event = await Event.create({
//       title: req.body.title,
//       imagePath: req.file.path,
//       description: req.body.description,
//     });

//     console.log("===> Event saved:", event);

//     res.status(201).json(event);
//   } catch (error) {
//     console.error("===> Error creating event:", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
// // @desc Update Event
// // @route PUT /api/event/:id
// // @access Private
// const updateEvent = asyncHandler(async (req, res) => {
//   const event = await Event.findById(req.params.id);
//   if (!event) {
//     res.status(404);
//     throw new Error("Event not found");
//   }

//   const updatedData = { ...req.body };
//   if (req.file) {
//     updatedData.imagePath = req.file.path;
//   }

//   const updatedEvent = await Event.findByIdAndUpdate(
//     req.params.id,
//     updatedData,
//     {
//       new: true,
//     }
//   );

//   res.status(200).json(updatedEvent);
// });

// // @desc Delete Event
// // @route DELETE /api/event/:id
// // @access Private
// const deleteEvent = asyncHandler(async (req, res) => {
//   const event = await Event.findById(req.params.id);
//   if (!event) {
//     res.status(404);
//     throw new Error("Event not found");
//   }

//   await Event.deleteOne({ _id: req.params.id });
//   res.status(200).json({ message: "Event deleted successfully" });
// });

// module.exports = { getEvents, getEvent, createEvent, updateEvent, deleteEvent };
