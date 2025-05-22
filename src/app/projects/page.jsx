import React from 'react'
import NavigationBar from '@/components/NavigationBar'
import projectdata from '../../../public/projects.json'
import Image from 'next/image'

const page = () => {

    console.log(projectdata)
    return (
        <>
            <div className="relative w-full h-[200vh] bg-transparent px-20 text-text font-chakra">

                <NavigationBar />

                <div className='relative'>
                    <div className=''>
                        <p className='text-4xl'>Projects</p>
                    </div>


                    <div className='grid grid-cols-2 gap-4'>
                        {
                            projectdata.projects.map((item, index) => {
                                return (
                                    <div key={index} className='flex flex-col justify-start items-start mt-10 border-2 border-accent rounded-xl p-5  w-[650px]'>
                                        <Image src={item.image} width={600} height={200} objectFit='contain' className='rounded-xl' />
                                        <div className='my-4'>
                                            <p className='text-2xl'>{item.name}</p>
                                            <p className='text-lg'>{item.description}</p>
                                            <p>{item.tech_stack}</p>
                                        </div>
                                        <div className='flex justify-between items-center w-20'>
                                            <div>
                                                <a href={item.repo} target='_blank' rel='noopener noreferrer' className='text-accent'>
                                                    <Image src='/github (1).png' width={30} height={30} alt='sd' className=' text-accent' />
                                                </a>
                                            </div>
                                            <div>
                                                <a href={item.live_demo} target='_blank' rel='noopener noreferrer' className='text-accent'>
                                                    <Image src='/live (1).png' width={30} height={30} alt='sd' className=' text-accent' />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>


        </>
    )
}

export default page