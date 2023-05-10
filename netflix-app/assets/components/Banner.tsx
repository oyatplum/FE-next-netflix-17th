'use client';
import React, { useEffect, useState } from 'react';
import instance from './../api/axios';
//import fetchNowPlaying from './../api/requests';
import styled from 'styled-components';
const API_KEY = '4a87076c7a6bfe146f57401604176096';

export const Banner = () => {
  const [movie, setMovie] = useState([] as any);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 현재 상영중인 영화들 가져오기
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
      )
    ).json();
    // 상영중인 여러 영화 중 한 영화의 ID 가져오기
    const movieId = results[Math.floor(Math.random() * results.length)].id;

    // 특정 영화의 상세 정보를 가져오기(비디오 정보 포함)
    const { data: movieDetail } = await instance.get(`movie/${movieId}`, {
      params: { append_to_response: 'videos' },
    });
    setMovie(movieDetail);
  };

  console.log('movie', movie);

  return (
    <Header
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
      }}
    ></Header>
  );
};

const Header = styled.div`
  position: absolute;
  width: 424.05px;
  height: 415px;
  left: -24.52px;
  top: 0px;

  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.45) 0%,
    rgba(0, 0, 0, 0) 87.26%,
    #000000 100%
  );
`;
