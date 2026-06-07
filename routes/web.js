const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const AdminController = require("../controllers/AdminController");
const ContactController = require("../controllers/ContactController");
const SkillController = require("../controllers/Skillcontroller");
const ProjectController = require("../controllers/ProjectController");
const UserController = require("../controllers/UserController");
const HeroController = require("../controllers/HeroController")
const AboutController = require("../controllers/AboutController");
const ServiceController = require("../controllers/ServiceController");
const { default: Certifications } = require("../Models/Certifications");
const { createCertificate, getAllCertificates } = require("../controllers/CertificationsController");
const CertificateController = require("../controllers/CertificationsController");




// admin route 
router.post("/register-admin", AdminController.register);
router.post("/admin-login", AdminController.login);
router.get("/logout-admin", auth, AdminController.logout);
router.get("/profile-admin", auth, AdminController.getProfile);
// router.put("/updateProfile", auth, AdminController.updateProfile);
// router.put("/changePassword", auth, AdminController.changePassword);

// contact routes
router.post("/createContact", ContactController.createContact);
router.get("/getAllContact", ContactController.getAllContact);
router.put("/updateContact/:id", ContactController.editContact);
router.delete("/deleteContact/:id", ContactController.deleteContact);

//skill routes
router.post("/createSkill", SkillController.createSkill);
router.get("/getAllSkill", SkillController.getAllSkill);
router.put("/updateSkill/:id", SkillController.updateSkill);
router.delete("/deleteSkill/:id", SkillController.deleteSkill);

// project routes
router.post("/createproject", ProjectController.createProject);
router.get("/getAllProjects", ProjectController.getAllProjects);
router.get("/getSingleProject/:id", ProjectController.getSingleProject);
router.put("/updateProject/:id", auth, ProjectController.updateProject);
router.delete("/deleteProject/:id", auth, ProjectController.deleteProject);

// user routes
router.post("/createUser", UserController.createProfile);
router.get("/getAllUser", UserController.getUser);
router.put("/updateUser/:id", UserController.updateUser);
router.delete("/deleteUser/:id", UserController.deleteUser);

//hero routes
router.post("/createHero", HeroController.createHero);
router.get("/getAllHero", HeroController.getAllHero);
router.get("/getSingleHero/:id", HeroController.getSingleHero);
router.put("/updateHero/:id", HeroController.updateHero);
router.delete("/deleteHero/:id", HeroController.deleteHero);

// about routes 
router.post("/createAbout", AboutController.createAbout);
router.get("/about", AboutController.getAbout);
router.put("/updateAbout/:id", AboutController.updateAbout);
router.delete("/deleteAbout/:id", AboutController.deleteAbout);


// services route 

router.post('/createservice', ServiceController.createService)

router.get('/getAllServices', ServiceController.getServices)

router.put('/updateService/:id', ServiceController.updateService)

router.delete('/deleteService/:id', ServiceController.deleteService)

// certification routes 
router.post('/createCertificate',CertificateController.createCertificate)
router.get('/getAllCertificates',CertificateController.getAllCertificates)
router.put('/updateCertificate/:id',CertificateController.updateCertificate)
router.get('/getSingleCertificate/:id',CertificateController.getSingleCertificate)
// router.delete('/deleteCertificate/:id'.CertificateController.deleteCer)






module.exports = router;