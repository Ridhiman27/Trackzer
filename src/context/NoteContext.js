//Importing the CreateContext Api from react
import { createContext } from "react";

//This is a new context for the createContext Api which is used for holding all the states related to notes so that all the components irrespective of their height in the heirarchy they can access the states
const NoteContext = createContext();


export default NoteContext;
