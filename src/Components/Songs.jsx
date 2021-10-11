import React from "react";

import * as mm from "@magenta/music";

import { useSelector } from "react-redux";

import { AiFillCaretRight } from "react-icons/ai";

function Songs() {
  const songs = useSelector((state) => state.songs.songs);

  const player = new mm.Player();

  if (songs.length === 0) return null;

  return (
    <div className="flex flex-col absolute pt-4">
      <div
        className="py-2 align-middle inline-block min-w-full"
        style={{ width: "300px" }}>
        <div className="overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-white">
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
                  <td className="whitespace-nowrap text-center">
                    <div className="text-gray-900">
                      <AiFillCaretRight
                        size="22px"
                        className="cursor-pointer mx-auto"
                        onClick={() => {
                          if (player.isPlaying() === true) {
                            player.stop();
                          } else {
                            player.start(song);
                          }
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Songs;
