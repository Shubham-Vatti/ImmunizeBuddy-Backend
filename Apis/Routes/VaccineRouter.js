const express = require('express');
const VaccineRouter = express.Router();
const VaccineListmodel=require('../Models/VaccineListmodel');
const mongoose=require('mongoose');
const Vaccincontroler=require('../Controllers/VaccineController')
VaccineRouter.post('/Vaccine-list/VD5',Vaccincontroler.Vaccine_list_register)


VaccineRouter.get('/Vaccine-list/get-list',Vaccincontroler.Vaccine_list_generatelst)


VaccineRouter.get('/Vaccine-list/Vaccine-id/:id',Vaccincontroler.Vaccine_list_generate_by_id)


VaccineRouter.get('/Vaccine-list/Vaccin-Data-To',Vaccincontroler.Vaccine_list_generate_data_belongs_to)


module.exports=VaccineRouter;