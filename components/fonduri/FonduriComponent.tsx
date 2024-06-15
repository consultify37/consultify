import React from "react"
import Link from "next/link"
import { Program } from "../../types"
import Image from "next/image"

type Props = {
    program: Program
    index?: number
    carousel?: boolean
    length?: number 
}

export default function FonduriComponent({ program, index=0, carousel=false, length }: Props) {
    let infoColor
    switch (program.status) {
        case 'PUBLICAT ÎN MONITORUL OFICIAL':
            infoColor = 'bg-orange-500'
            break
        case 'LANSAT ÎN CONSULTARE PUBLICĂ':
            infoColor = 'bg-yellow-500'
            break
        case 'APEL DESCHIS':
            infoColor = 'bg-green-500'
            break
        case 'APEL ÎNCHIS':
            infoColor = 'bg-red-500'
            break
        default:
            infoColor = ''
    }

    return(
        <div className={"relative w-full " + (carousel ? "" : (index % 4 != 3 && !(length && index == length - 1) ? "mb-64 lg:mb-56" : "mb-32 lg:mb-24") )}>
            <div className={"flex flex-col left-0 right-0 mx-auto justify-center w-fit max-w-[80%] lg:max-w-[35%] self-center items-center rounded-2xl absolute -bottom-[200px] lg:-bottom-[160px] z-[5] bg-secondary py-8 px-8 " + (index % 2 == 0 ? "lg:left-[120px] lg:right-auto" : "lg:right-[120px] lg:left-auto" )}>
                <h5 className="text-white text-xl xl:text-4xl font-bold mb-6">{program.title}</h5>
                <ul className="list-disc list-inside">
                    { program.bulletPoints.map((bulletPoint, index) => (
                        <li key={index} className="text-[#EDD7FF] font-semibold text-[15px] xl:text-base mb-4">{ bulletPoint }</li>
                    ))}
                </ul>
                <Link className="py-3 mt-4 bg-[#BA63FF] text-[#fff] flex items-center rounded-[28.5px] font-semibold px-11 text-center sm:px-12 hover:scale-[1.05] transition-all" href={"/Programe/" + program.id}>Aplică acum!</Link>
            </div>

            <div 
                className={"rounded-4xl min-h-[400px] relative overflow-hidden flex flex-col-reverse justify-between px-4 lg:px-20 py-2 bg-cover bg-no-repeat align-center " + (carousel ? " mx-2 md:mx-8 lg:flex-row" : ( index == 0 ? 'mt-[2rem] md:mt-[4rem]' : 'mt-[8rem]') + ( index % 2 == 0 ? " lg:flex-row" : " lg:flex-row-reverse")) }
                key={program.id}
            >   
                <div className={`absolute top-10 -right-16 z-10 rotate-45 ${infoColor} w-[240px] p-2 px-[46px] shadow-black text-center shadow-lg`}>
                    <p className="text-white text-[12px] font-bold">
                        { program.status == 'LANSAT ÎN CONSULTARE PUBLICĂ' ?
                            <span>LANSAT ÎN <br />CONSULTARE PUBLICĂ</span> : program.status
                        }
                    </p>
                </div>
                <Image 
                    src={program.backgroundImage.image}
                    width={2132}
                    height={822}
                    alt="image"
                    className="w-full h-[360px] md:h-full absolute rounded-[35px] left-0 z-[1] top-0 object-cover object-left"
                />
                <div style={{background: "rgba(0, 0, 0, 0.45)", }} className="w-full h-[360px] md:h-full absolute rounded-[35px] left-0 z-[1] top-0"></div>
                <div className={'absolute top-0 lg:static flex flex-col w-full justify-center pt-12 z-[1] ' + (index % 2 === 0 ? 'items-start lg:items-end' : 'items-start')}>
                    <h5 className={'text-white font-bold text-sm xl:text-xl mb-2 md:mb-3 ' + (index % 2 === 0 ? 'text-right' : '') }>
                        {program.text1}
                    </h5>
                    <h4 className={'text-white text-xl xl:text-4xl mb-2 md:mb-3 font-extrabold ' + (index % 2 === 0 ? 'text-right' : '')}>
                        { program.text2 }
                    </h4>
                    <h6 className={'text-white text-xl xl:text-4xl md:mb-3 font-extrabold ' + (index % 2 === 0 ? 'text-right' : '')}>
                        { program.suma }
                    </h6>
                </div>
            </div>
        </div>
    )
}