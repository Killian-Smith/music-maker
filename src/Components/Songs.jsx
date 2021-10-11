import React from "react";

import * as mm from "@magenta/music";

import { useSelector } from "react-redux";

import { AiFillCaretRight } from "react-icons/ai";

function Songs() {
  const songs = useSelector((state) => state.songs.songs);

  const player = new mm.Player();

  if (songs.length === 0) return null;

  return (
    <div className="flex w-64 h-96 overflow-y-auto overflow-x-hidden flex-col absolute">
      <div className=" sm:rounded-lg">
        <table className="min-w-full divide-y">
          <thead className="bg-white">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-none shadow-none">
                Song
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-none shadow-none">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y border-white">
            {songs.map((song, index) => (
              <tr key={index} className="border-white shadow-none">
                <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="text-sm font-medium text-gray-900 text-center">
                    {index}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="text-sm font-medium text-gray-900">
                    <AiFillCaretRight
                      className="cursor-pointer"
                      onClick={() => player.start(song)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Songs;
