const sql = require("../databases/mysql");
const Users = require("../models/user.model");
const Address = require("../models/address.model");
const express = require("express")

const User = {
    findAll: async (req, res) => {
        let conexion = sql();
        const users = await Users.findAll();
        conexion.close();
        res.json(users);
    },
    register: async (req,res)=>{
       const {way_type, address, a_number, additional_address, locality, province, country, postal_code} = req.body;
       const { first_name, last_name, email, phone, birth_date, user_password } = req.body;
    }
    
}

module.exports = User;