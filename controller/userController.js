const { Item } = require(`../models`);
const { jwtSign, jwtVerify } = require("../helper/jwt");
const { encryptPassword, decryptPassword } = require("../helper/bcrypt");
const upload = require("../helper/multer");

class userController {
  // static async getUser(req, res) {
  //   const access_token = req.headers.access_token
  //   try{
  //     const token = jwtVerify(access_token)
  //     console.log("Token hasil verifikasi:", token);
  //     const users =  await Item.findAll({
         
  //     })
  //     res.status(500).json(users)
  //   }
  //   catch(err){
  //     res.send({
  //       message : "token salaaaah"
  //     })
  //   }
  // }
  static getUser(req,res){
    const access_token = req.headers.access_token
    const token = jwtVerify(access_token)
    Item.findAll({
      where : {
        id : token.id
      }
    })
    .then((result)=>{
      res.status(200).json(result)
    })
    .catch((err)=>{
      res.status(400).json(err)
    })
  }

  static getUserId(req,res){
    const access_token = req.headers.access_token
    const token = jwtVerify(access_token)
    Item.findAll()
    .then((result)=>{
      
      res.status(200).json(result)
    })
    .catch((err)=>[
      res.status(404).json(err)
    ])

  }
  static create(req, res) {
    const { name, type, price, stock, image, UserId } = req.body;
    Item.create({
      name,
      type,
      price,
      stock,
      image,
      UserId,
    })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static delete(req, res) {
    const id = req.params.id;
    Item.destroy({
      where: {
        id: id,
      },
    })
      .then((result) => {
        res.send({
          message: `${id} berhasil di hapus`
        });
      })
      .catch((err) => {
        res.send({
          message : "hapus gagal"
        });
      });
  }
  static login(req, res) {
    const { name, type } = req.body
    Item.findOne({
        where : {name}
    })
      .then((result) => {
        if(result.name){
        if(decryptPassword(type, result.type)){
        const access_token = jwtSign({
        id: result.id,
        name: result.name,
        });
            res.json({access_token
            })
            const verifyToken = jwtVerify(access_token)
            console.log(verifyToken)
        }
        else{
            res.send({
                message : "password salah"
            })
        }
        }
        else{
            res.send({
                message :"username tidak ada"
            })
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static getProfile = (req,res)=>{
    const id = Number(req.params.id)
    Item.findByPk(id)
    .then((result)=>{
      res.send(result)
    })
    .catch((err)=>{
      res.send(err)
    })
  }
  static updateImage = (req,res)=>{
    const {id} = req.params
    const fileName =req.file.filename 
    Item.update(
      {image : fileName},
      {where:{id}}
    )

    .then((result)=>{
      res.json({
        message :"update image success",
        updatedItem: result
      })
    })
    .catch((err)=>{
      res.json(err)
    })
  }
}

module.exports = userController;
