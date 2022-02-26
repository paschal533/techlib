import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { GrFacebookOption } from 'react-icons/gr';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import logo from '../assets/logowhite.png';
import Image from '../assets/image2.jpg';

import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();
  const responseFacebook = (response) => {
    const { name, id } = response;
    const doc = {
      _id: id,
      _type: 'user',
      userName: name,
      image: response.picture.data.url,
    };
    localStorage.setItem('user', JSON.stringify(doc));
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  const responseGoogle = (response) => {
    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };
    localStorage.setItem('user', JSON.stringify(doc));
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <img
          src={Image}
          alt="img"
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
          <div className="shadow-2xl">
            <FacebookLogin
              appId={process.env.REACT_APP_SANITY_FACEBOOK_ID}
              fields="name,email,picture"
              callback={responseFacebook}
              disableMobileRedirect
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-blue-500 flex text-white-500 btn p-3 mt-3 justify-center items-center rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                >
                  <GrFacebookOption /> Sign in with facebook
                </button>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
