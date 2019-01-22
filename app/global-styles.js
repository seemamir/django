import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    background-color: #fafafa;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100vh;
    min-width: 100%;
  }
  .container{
    width:85%;
    margin: 30px auto;
  }
  .ant-list-item-meta-description{
    word-wrap: break-word;
    word-break: break-word;
  }
  .bg-white{
    background: white;
    padding:20px;
    .view-sentences{
      overflow-x: auto;
      word-wrap: break-word;
      word-break: break-word;
      width: 100%;
      padding: 10px;
      border:1px solid #eee;
      min-height: 100px;
      color: #6b6b6b;
    }
  }
  .danger-btn{
    background:red;
    color:white;
    margin-top:20px;
    border-color:red;
  }
  .primary-btn{
    background:#40a9ff;
    color:white;
    margin-top:20px;
    padding:6px 12px;
    border-radius: 4px;
    border-color:red;
    :hover{
      color: white
    }
  }
 textarea{
   border: 1px solid #eee;
   width: 100%;
   padding: 8px
 }
 .danger-btn{
   background:red;
   color:white;
   margin-top:20px;
 }
  p { 
    color: #999
  }
  .comments{
    text-align:left;
    p{
      color: #555;
      margin: 15px 0 !important;
    }
  }
  .logo-header{
    float:left;
    color:#555;
    font-weight:bold;
    padding-left:20px;
  }
  .ant-alert{
    margin-bottom: 30px;
  }
  .content{
    margin: 24px 16px;
    padding: 24px;
    background: #fff;
  }
  .btn-success{
    background:#4CAF50;
    border-color: #4CAF50;
    :hover,:focus{
    background:#449d48;
    border-color: #449d48;
      
    }
  }
  /* Header */
  .ant-layout-header{
    position: fixed;
    top:0;
    background:white;
    width:100%;
    z-index:10;
    box-shadow: 0px 2px 5px #ccc
  }
  .sidebar{
    top:65px;
  }
  .sidebar .logo {
    text-align:center;
    img{
      width:50%;
      margin-bottom:30px;
    }
  }
  /* Login Page */
  .wrapper{
    text-align:center;
    padding-top:100px;
    .logo{
      margin:30px auto;
      font-size:50px;
    }
    h3{
      font-size:20px;
    }
    .login-form {
      max-width: 100%;
      margin-top:30px;
      input{
        background:transparent;
        :hover, :focus{
          border:1px solid #ccc7c7 !important;
          box-shadow:none;
        }
      }
      .login-form-forgot {
        text-align: right;
        margin-top:10px;
      }
      .go-back {
        text-align: left;
        margin-top:10px;
      }
      .login-form-button {
        width: 100%;
        .anticon svg{
          margin-top:-8px;
          margin-left:10px;
          color:white;
        }
      }
      .signup-btn{
        margin-top:25px;
      }
      .signup{
        margin-top:30px;
      }
      .content-divider {
        text-align: center;
        display:block;
        position: relative;
        z-index: 1;
        span {
          background-color: #eeeded;
          display: inline-block;
          padding: 1px 16px;
          line-height:18px;
          color: #999999;
          :before{
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            height: 1px;
            background-color: #ddd;
            width: 100%;
            z-index: -1;
          }
        }
      } 
    }
  }
  /* Home page */
  .filters{
    width: 100%;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 20px ;
    display: flex;
    align-content: space-around;
    box-shadow:none;
    button{
      background: transparent;
      border:none !important;
      margin-bottom: 0 !important;
      width: 300px;
      font-size:18px;

      :focus, :active{
        box-shadow:none;
        border:none;
        outline:none
      }
      
    }
  }
  /* View Page */
  .ant-list-item-meta-title a{
    color: rgba(0,0,0,0.65);  
    :hover{
    color: rgba(0,0,0,0.68)
    }
  }
  .reaction-sidebar{
    .react-box{
      min-height: 180px;
    p{
      min-height: 50px;
    }
    }
    .reaction-icons{
      font-size:50px;
      :hover{
        font-size:52px;
      }
    }
  }
  /* News page */

  .avatar-uploader {
    .ant-upload{
      border-radius:50%;
      margin:auto auto 10px auto;
      i{
        font-size:25px;
      }
    }
    .ant-upload {
      width: 128px;
      height: 128px;
    }
    img{
      width: 128px;
      height: 128px;
      border-radius:50%;
    }
  }
  .news-box{
    margin-bottom:  50px ;
    word-wrap: break-word;
    margin-right: 20px;
    height:350px;
    .ant-card-cover{
      height:60%;
      img{
        height:100%;
      }
    }
    
    h3{
      height: 30px;
      overflow: hidden;
    }
 
  }
  footer{
    background: #fff;
    color: #8c8c8c;
    text-align: center;
    padding: 20px 0;
  }
    
`;

export default GlobalStyle;
