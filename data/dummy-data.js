import Project from "../models/project";

const PROJECTS = [
  new Project(
    "p1",
    "u1",
    "u1",
    "Brain-to-Computer Interfacing",
    "https://i.imgur.com/6X9LviI.jpg",
    "This project is based around the construction and modifcation of an instructables DIY electroencephalogram aimed at providing communication via neural firing patterns using current AI strategies. The foundation of this project lies at https://www.instructables.com/id/DIY-EEG-and-ECG-Circuit/. Here you will find every aspect as to how to create the EEG yourself, and will help with understanding every aspect of the foundation of this project as well."
  ),
  new Project(
    "p2",
    "u1",
    "u1",
    "Co-Creator",
    "https://i.imgur.com/Zt2pmHD.png",
    "Super rad project hosting app."
  ),
  new Project(
    "p3",
    "u2",
    "u2",
    "Automated Stock Trader",
    "https://i.imgur.com/P4WiqAb.png",
    "Automatic stock trading program to make me $$$."
  ),
  new Project(
    "p4",
    "u3",
    "u3",
    "Showcase",
    "https://i.imgur.com/jpbEQku.png",
    "A mobile app designed to showcase them in action as well as media from their jobs or projects."
  ),
];

export default PROJECTS;
