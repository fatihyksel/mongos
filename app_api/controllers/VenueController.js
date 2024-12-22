const { status } = require("express/lib/response");
var mongoose = require("mongoose");
var Venue = mongoose.model("venue");

const createResponse = function (res, status, content) {
  res.status(status).json(content);
}

const listVenues = function (req, res) {
  createResponse(res, "200", { status: "success" });
}

const addVenue = async function (req, res) {
  try{
    await Venue.create({
      ...req.body,
      cordinates:[req.body.lat,req.body.long],
      hours:[{
        days:req.body.days1,
        open:req.body.open1,
        close:req.body.close1,
        isClosed:req.body.isClosed1,
      },
      {
        days:req.body.days2,
        open:req.body.open2,
        close:req.body.close2,
        isClosed:req.body.isClosed2,
      },
    ],
    }).then(function(response){
      createResponse(res,201,response);
    });
  }catch(error){
    createResponse(res,"400",error)
  }
}

const getVenue = async function (req, res) {
  try {
    await Venue.findById(req.params.venueid).exec().then(function (venue) {
      createResponse(res, "200",venue);
    });
  } catch (error) {
    createResponse(res, "404", { status: "Böyle bir mekan yok" });
  }
};

const updateVenue = async function (req, res) {
  try{
    const updateVenue= await Venue.findByIdAndUpdate(req.params.venueid,{
      ...req.body,
      cordinates:[req.body.lat,req.body.long],
      hours:[{
        days:req.body.days1,
        open:req.body.open1,
        close:req.body.close1,
        isClosed:req.body.isClosed1,
      },
      {
        days:req.body.days2,
        open:req.body.open2,
        close:req.body.close2,
        isClosed:req.body.isClosed2,
      },
    ],
    });
      createResponse(res,201,updateVenue);
  }catch(error){
    createResponse(res,"400",{status:"günceleme başarısız."})
  }
}

const deleteVenue = async function (req, res) {
  try{
    await Venue.findByIdAndDelete(req.params.venueid).then(function(venue){
      createResponse(res, "200", { status:venue.name+ "isimli mekan silindi" });
    });
  }catch(error){
    createResponse(res, "404", { status: "Böyle bir mekan yok" });
  }
};
module.exports = {
  listVenues,
  addVenue,
  getVenue,
  updateVenue,
  deleteVenue,
};
