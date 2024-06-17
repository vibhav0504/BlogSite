import { Footer  } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import {BsFacebook , BsInstagram , BsGithub , BsTwitter} from "react-icons/bs"

const FooterComponent = () => {
  return (
    <Footer container className='border border-t-8 border-teal-500 '>
      <div className="w-full  max-w-7xl mx-auto">
        <div className=" grid w-full justify-between sm:flex md:grid-cols-1">
            <div className="mt-5">
            <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
        <span className="rounded-lg text-pink-500 px-1  py-1 bg-gradient-to-r from-indigo-500 to-white">My</span>
        Blog
    </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
                <Footer.Title title='About'/>
                <Footer.LinkGroup col>
                    <Footer.Link href='https://www.instagram.com' target='blank'
                     rel=' noopener noreferrer'>
                      Instagram
                    </Footer.Link>
                    <Footer.Link href='/about' target='blank'
                     rel=' noopener noreferrer'>
                      My Blog
                    </Footer.Link>
                </Footer.LinkGroup>
            </div>
            <div>

<Footer.Title title='Follow us'/>
<Footer.LinkGroup col>
    <Footer.Link href='https://www.github.com/vibhav0504' target='blank'
     rel=' noopener noreferrer'>
      Github
    </Footer.Link>
    <Footer.Link href='/#' target='blank'
     rel=' noopener noreferrer'>
     Discord
    </Footer.Link>
</Footer.LinkGroup>
</div>
            <div>

<Footer.Title title='LEGAL'/>
<Footer.LinkGroup col>
    <Footer.Link href='#' target='blank'
     rel=' noopener noreferrer'>
       Privacy Policy
    </Footer.Link>
    <Footer.Link href='/#' target='blank'
     rel=' noopener noreferrer'>
    Terms & Conditions
    </Footer.Link>
</Footer.LinkGroup>
</div>
            </div>
        </div>
        <Footer.Divider/>
        <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright href='# ' by='My Blog' year={new Date().getFullYear()}/>
            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                <Footer.Icon href='#' icon={BsFacebook}/>
                <Footer.Icon href='#' icon={BsInstagram}/>
                <Footer.Icon href='#' icon={BsTwitter}/>
                <Footer.Icon href='https://github.com/vibhav0504' icon={BsGithub}/>
            </div>
        </div>

      </div>
    </Footer>
  )
}

export default FooterComponent
