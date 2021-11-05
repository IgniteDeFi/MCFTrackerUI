import { useState } from 'react';
import background from '../Images/background.png';
import boxes from '../Images/boxes.png';
import logo from '../Images/logo.png';
import price1 from '../Images/prize 1.png';
import price2 from '../Images/prize 2.png';
import price3 from '../Images/prize 3.png';
import price4 from '../Images/prize 4.png';
import price5 from '../Images/prize 5.png';
import price6 from '../Images/prize 6.png';
import mcfCoin from '../Images/mcf coin.png';

const initialPricesState = [
  {
    logo: price1,
    price: 0,
  },
  {
    logo: price2,
    price: 0,
  },
  {
    logo: price3,
    price: 0,
  },
  {
    logo: price4,
    price: 0,
  },
  {
    logo: price5,
    price: 0,
  },
  {
    logo: price6,
    price: 0,
  },
];

const initialCirclesState = [
  {
    id: 1,
    isPressed: false,
  },
  {
    id: 2,
    isPressed: false,
  },
  {
    id: 3,
    isPressed: false,
  }
]

export const LuckyScratchPage = () => {

  const [prices, setPrices] = useState(initialPricesState);
  const [totalMCFPaid, setTotalMCFPaid] = useState(0);
  const [scratchCardSold, setScratchCardSold] = useState(0);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [circlesState, setCirclesState] = useState(initialCirclesState);

  const [message, setMessage] = useState({
    showMessage: false,
    success: true,
    value: 0,
  });

  const { showMessage, success, value } = message;

  const handleMessageButtonClick = () => {

  }

  const handleCircleClick = (id) => {
    setCirclesState(
      circlesState.map(circle => circle.id === id ? { ...circle, isPressed: true } : circle)
    );
  }

  const handleBuyClick = () => {

  }

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center center"
      }}
      className="w-full h-auto xl:h-screen flex items-center relative overflow-hidden"
    >
      {
        showMessage && (
          <div className="flex flex-col items-center gap-5 absolute w-screen h-60 bg-gray-700 bottom-0 left-0 z-50 py-10 px-10 lg:px-40">
            <h1 className="text-5xl text-center font-extrabold text-yellow text-shadow">{success ? "Congratulations" : "Try again"}</h1>
            <p className="uppercase text-yellow font-bold text-2xl">You {success ? "won" : "lost"} {value} factory</p>
            <button
              className="bg-orange font-bold rounded-xl py-2 px-5 text-yellow text-3xl"
              onClick={handleMessageButtonClick}
            >
              {success ? "CLAIM" : "TRY AGAIN"}
            </button>
          </div>
        )
      }
      <div>
        <div className="w-screen mt-10 mb-20 xl:my-0 flex flex-col xl:flex-row items-center justify-center gap-10 text-blue-900">
          <div className="w-9/12 sm:w-7/12 md:w-5/12 lg:w-4/12 xl:w-2/12">
            <h1 className="font-bold text-blue-900 text-center text-xl">Price Chart</h1>
            <div className="flex flex-col gap-5 border-4 border-yellow-700 rounded-xl p-5 bg-yellow">
              {
                prices.map(({ logo, price }) => (
                  <div
                    key={logo}
                    className="flex justify-between"
                  >
                    <div className="flex gap-2">
                      <div
                        style={{
                          backgroundImage: `url(${logo})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center center"
                        }}
                        className="h-5 w-5"
                      />
                      <div
                        style={{
                          backgroundImage: `url(${logo})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center center"
                        }}
                        className="h-5 w-5"
                      />
                      <div
                        style={{
                          backgroundImage: `url(${logo})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center center"
                        }}
                        className="h-5 w-5"
                      />
                    </div>
                    <div className="flex items-center gap-5">
                      <label>{price}</label>
                      <div
                        style={{
                          backgroundImage: `url(${mcfCoin})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center center"
                        }}
                        className="h-5 w-5"
                      />
                    </div>
                  </div>
                ))
              }
              <div className="flex flex-col gap-2 self-center">
                <div className="flex gap-5 self-center items-center">
                  <h1 className="text-2xl font-bold">1,000</h1>
                  <div
                    style={{
                      backgroundImage: `url(${mcfCoin})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center center"
                    }}
                    className="h-10 w-10"
                  />
                </div>
                <p className="font-bold self-center text-xs">per Scratch Card</p>
              </div>
            </div>
          </div>
          <div className="w-9/12 sm:w-7/12 md:w-9/12 lg:w-1/2">
            <div
              className="flex flex-col gap-10 justify-evenly w-full h:auto md:h-96 bg-orange border-4 border-yellow rounded-xl p-10"
            >
              <div
                style={{
                  backgroundImage: `url(${logo})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center"
                }}
                className="mx-auto w-60 h-24"
              />
              <div className="flex flex-col md:flex-row items-center justify-center gap-20 w-full">
                {
                  circlesState.map(({ id, isPressed }) => (
                    <div
                      key={id}
                      className={`${isPressed ? "bg-blue-300" : "bg-purple-300 cursor-pointer"} flex justify-center items-center rounded-full border-4 border-yellow flex-shrink-0 h-24 w-24 font-bold`}
                      onClick={() => handleCircleClick(id)}
                    >
                      {isPressed ? "CORRECT" : ""}
                    </div>
                  ))
                }
              </div>

            </div>
          </div>

          <div className="w-9/12 sm:w-7/12 md:w-5/12 lg:w-4/12 xl:w-2/12">
            <div>
              <div className="flex items-center justify-center gap-1.5 font-bold text-blue-900 text-lg">
                <h1>TOTAL</h1>
                <div
                  style={{
                    backgroundImage: `url(${mcfCoin})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                  }}
                  className="h-5 w-5"
                />
                <h1>FACTORY paid</h1>
              </div>
              <div className="flex flex-col gap-5 border-4 border-yellow-700 rounded-xl text-right py-1 px-2 bg-yellow">
                <p className="font-bold text-xl">{totalMCFPaid}</p>
              </div>
              <h1 className="font-bold text-blue-900 text-lg text-center mt-5">Scratch Card Sold</h1>
              <div className="flex flex-col gap-5 border-4 border-yellow-700 rounded-xl text-right py-1 px-2 bg-yellow">
                <p className="font-bold text-xl">{scratchCardSold}</p>
              </div>
              <h1 className="font-bold text-blue-900 text-lg text-center mt-5">Total Players</h1>
              <div className="flex flex-col gap-5 border-4 border-yellow-700 rounded-xl text-right py-1 px-2 bg-yellow">
                <p className="font-bold text-xl">{totalPlayers}</p>
              </div>
              <div className="text-center text-sm mt-5">
                <p>
                  Do not send funds to the contract address
                  as they will be lost
                  This is Defi, play at your own risk.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-evenly w-screen absolute -bottom-5">
          <div
            style={{
              backgroundImage: `url(${boxes})`,
              backgroundSize: "cover",
              backgroundPosition: "center center"
            }}
            className="w-1/4 h-28"
          />
          <div
            style={{
              backgroundImage: `url(${boxes})`,
              backgroundSize: "cover",
              backgroundPosition: "center center"
            }}
            className="w-1/4 h-28"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-2 mt-10 w-full">
          <button
            className="bg-orange py-2 px-5 text-yellow font-bold text-4xl rounded-2xl"
            onClick={handleBuyClick}
          >
            BUY
          </button>
          <label className="border-b-2	border-blue-900">Rules & Gamble Aware</label>
        </div>
      </div>
    </div >
  )
}
