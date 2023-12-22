import express from 'express';
import passport from 'passport';
import cors from 'cors'


const server = express();
server.use(express.json());
//server.use(express.urlencoded({extended:true}))
//server.use(cors());
//server.use(passport.initialize());
//server.use(passport.session());

export default server