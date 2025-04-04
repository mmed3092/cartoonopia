import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { getSingleCharacter } from "../api/CharacterQuery";
import { Character } from "../types/CartoonopiaTypes";

import HeartImg from "../assets/images/heart.png";
import RedHeartImg from "../assets/images/redheart.png";
import {
  useGetIsFavourites,
  useToggleFavourite,
} from "../hooks/FavouriteHooks";
import { useSingleCharacterQuery } from "../hooks/CharacterHooks";

const CharacterDetails = () => {
  const { id } = useParams();
  const [characterData, setCharacter] = useState<Character | null>(null);
  const [heart, setheart] = useState(false);
  const [showText, setShowText] = useState(false);

  if (!id) {
    return <div>Invalid character id</div>;
  }

  const { data, ...characterQuery } = useSingleCharacterQuery(id);
  const { mutate, ...toggleMutation } = useToggleFavourite(id);
  const isFavourite = useGetIsFavourites(id);

  useEffect(() => {
    if (data) {
      setCharacter(data);
    }
  }, [data]);

  // useEffect(() => {
  //   if (!isFavourite.isError && isFavourite.isSuccess) {
  //     console.log(isFavourite.data)
  //     if (isFavourite.data) {
  //       setheart(true);
  //     }
  //   } else {
  //     setheart(false);
  //   }
  // }, [isFavourite.status, toggleMutation.status]);

  const handleHeartClick = () => {
    mutate();
    setShowText(true);
    setTimeout(() => {
      setShowText(false);
    }, 1000);
    //add the
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center w-3/4 xl:w-1/2 p-8  border-black rounded-md shadow-md">
        <div className="flex justify-between w-full items-center mb-4">
          <h1 className="text-2xl font-semibold">Character Details</h1>
          <img
            className="w-6 h-6 cursor-pointer"
            src={isFavourite.data ? RedHeartImg : HeartImg}
            onClick={handleHeartClick}
            alt="Heart"
          ></img>
        </div>
        <p className="mb-4">Created by: {characterData?.created_by}</p>
        <table className="w-full ">
          <tbody>
            <tr>
              <td className="font-semibold pr-4">Name:</td>
              <td>{characterData?.name}</td>
            </tr>
            <tr>
              <td className="font-semibold pr-4">Description:</td>
              <td valign="bottom">{characterData?.description}</td>
            </tr>
            <tr>
              <td className="font-semibold pr-4">Strength:</td>
              <td>{characterData?.strength}</td>
            </tr>
            <tr>
              <td className="font-semibold pr-4">Skill:</td>
              <td>{characterData?.skill}</td>
            </tr>
            <tr>
              <td className="font-semibold pr-4">Fear Factor:</td>
              <td>{characterData?.fear_factor}</td>
            </tr>
            <tr>
              <td className="font-semibold pr-4">Power:</td>
              <td>{characterData?.power}</td>
            </tr>
            <tr>
              <td className="font-semibold pr-4">Intelligence:</td>
              <td>{characterData?.intelligence}</td>
            </tr>
            <tr>
              <td className="font-semibold pr-4">Wealth:</td>
              <td>{characterData?.wealth}</td>
            </tr>
          </tbody>
        </table>
        {showText && (
          toggleMutation.isError ? (
            <p className="text-red-500">{toggleMutation.error.message}</p>
          )
          : toggleMutation.isSuccess && (
          <p className={isFavourite.data ? "text-green-500" : "text-red-500"}>
            {isFavourite.data ? "Added to favorites" : "Removed from favorites"}
          </p>
          )
        )}
      </div>
    </div>
  );
};

export default CharacterDetails;
