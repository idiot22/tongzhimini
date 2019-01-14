//index.js

Page({
  data: {

    bargainList: [
      {
        title: "18学年奖学金评定结果...",
        img: "../../../images/tzimg/1.jpg",
        desc: "特等奖才4000，一等奖2000，二等奖800，三等奖200这让人没动力学习啊啊啊啊啊啊啊啊啊",
        basePrice: "3999",
        originalPrice: "48888",
        limit: "18"
      },
      {
        title: "18学年奖学金评定结果...",
        img: "../../../images/tzimg/1.jpg",
        desc: "特等奖才4000，一等奖2000，二等奖800，三等奖200这让人没动力学习啊",
        basePrice: "3999",
        originalPrice: "48888",
        limit: "18"
      },
      {
        title: "18学年奖学金评定结果...",
        img: "../../../images/tzimg/1.jpg",
        desc: "特等奖才4000，一等奖2000，二等奖800，三等奖200这让人没动力学习啊",
        basePrice: "3999",
        originalPrice: "48888",
        limit: "18"
      },
      {
        title: "18学年奖学金评定结果...",
        img: "../../../images/tzimg/1.jpg",
        desc: "特等奖才4000，一等奖2000，二等奖800，三等奖200这让人没动力学习啊",
        basePrice: "3999",
        originalPrice: "48888",
        limit: "18"
      },
      {
        title: "18学年奖学金评定结果...",
        img: "../../../images/tzimg/1.jpg",
        desc: "特等奖才4000，一等奖2000，二等奖800，三等奖200这让人没动力学习啊",
        basePrice: "3999",
        originalPrice: "48888",
        limit: "18"
      },
      {
        title: "18学年奖学金评定结果...",
        img: "../../../images/tzimg/1.jpg",
        desc: "特等奖才4000，一等奖2000，二等奖800，三等奖200这让人没动力学习啊",
        basePrice: "3999",
        originalPrice: "48888",
        limit: "18"
      },
      {
        title: "18学年奖学金评定结果...",
        img: "../../../images/tzimg/1.jpg",
        desc: "特等奖才4000，一等奖2000，二等奖800，三等奖200这让人没动力学习啊",
        basePrice: "3999",
        originalPrice: "48888",
        limit: "18"
      }
    ],
    topicList: [
      {
        img: "../../images/tzimg/1.jpg",
        title: "18学年奖学金评定结果",
        subTitle: "特等奖才4000，一等奖2000，二等奖800，三等奖200这让人没动力学习啊",
        price: "6879"
      },
      {
        img: "../../images/tzimg/1.jpg",
        title: "18学年奖学金评定结果",
        subTitle: "舌尖上的非凡感觉",
        price: "388"
      },
      {
        img: "../../images/tzimg/1.jpg",
        title: "智能家具",
        subTitle: "带给你不一样的体验",
        price: "6879"
      }
    ]

  },
  goDetail: function (event) {
    console.log(event)
    wx.navigateTo({
      url: '../tzxq/tzxq'
    })
  }
})