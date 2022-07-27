const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model');


class TokenService {

   generateTokens(payload){
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15s'})
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30s'})
      // Если пользователь не заходил на наш аккаунт больше 30д, то ему нужно будет залогин
      return {
         accessToken,
         refreshToken
      }
   }

   validateAccessToken(token){
      try {
         const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
         return userData;
      } catch (e) {
         return null
      }
   }

   validateRefreshToken(token){
      try {
         const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
         return userData;
      } catch (e) {
         return null
      }
   }

   async saveToken(userId, refreshToken){
      const tokenData = await tokenModel.findOne({ user: userId })

      if(!!tokenData){
         // если условие не выполнилось
         // значит пользователь логиниться первый раз
         tokenData.refreshToken = refreshToken
         const updatedRefreshToken = await tokenData.save()
         
         return updatedRefreshToken
      }

      const token = await tokenModel.create({user: userId, refreshToken})

      return token
   }

   async removeToken(refreshToken){
      const tokenData = await tokenModel.deleteOne({ refreshToken })

      return tokenData
   }

   async findToken(refreshToken){
      const tokenData = await tokenModel.findOne({ refreshToken })

      return tokenData
   }
}

module.exports = new TokenService()