const service_type = require('../models/service_type');

const create = async (req, res) => {
    try {
      const {
        name
      } = req.body;
  
  
      const service = await service_type.create({
        name
      });
  
      res
        .status(201)
        .json({ service, message: "service has been added successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "error adding service",
        error: error.message,
      });
    }
  };

  const index = async(req, res) => {
    try {
        const services = await service_type.findAll();

        if(services.length == 0) throw new Error('there are no sevices')
        res
          .status(201)
          .json({ services, message: "services have been returned successfully" });
      } catch (error) {
        console.log(error);
        res.status(404).json({
          message: "error loading service",
          error: error.message,
        });
      }
  } 

  module.exports = {create, index};
  