'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GithubIcon, LinkedinIcon, FileTextIcon, MailIcon, ExternalLinkIcon } from "lucide-react"
import Link from 'next/link'
import Image from 'next/image'

// Assume this is passed as a prop or set as an environment variable
const DISCORD_AVATAR_URL = "https://cdn.discordapp.com/avatars/325699845031723010/3eb13f80d44c05a0f94e9fd0151e2fbd.webp"

export default function Component() {
  const [activeTab, setActiveTab] = useState('about')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'skills', 'contact']
      const scrollPosition = window.scrollY + 100 // Offset for header

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveTab(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 64, // Offset for header height
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center fixed w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <Link className="flex items-center justify-center" href="#">
          <span className="sr-only">Your Name</span>
          <span className="font-bold text-xl">YN</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {['about', 'projects', 'skills', 'contact'].map((item) => (
            <Button
              key={item}
              variant="ghost"
              className={`text-sm font-medium ${activeTab === item ? 'text-primary' : 'text-muted-foreground'}`}
              onClick={() => scrollToSection(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Button>
          ))}
        </nav>
      </header>
      <main className="flex-1 pt-16">
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <Avatar className="w-24 h-24 border-4 border-background">
                <AvatarImage src={DISCORD_AVATAR_URL} alt="Profile Picture" />
                <AvatarFallback>YN</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Your Name
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Full Stack Developer | Open Source Enthusiast | Tech Blogger
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-500 dark:text-gray-400">
                  🚀 5+ years of experience in building scalable web applications
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  🌟 Specialized in React, Node.js, and Cloud Technologies
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  📚 Continuous learner and contributor to tech communities
                </p>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" asChild>
                  <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                    <LinkedinIcon className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href="mailto:your.email@example.com">
                    <MailIcon className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <motion.section 
          id="projects"
          className="w-full py-12 md:py-24 lg:py-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Featured Projects</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: 'Project 1', desc: 'A sophisticated e-commerce platform', tech: ['React', 'Node.js', 'MongoDB'], link: 'https://project1.example.com' },
                { title: 'Project 2', desc: 'Real-time collaborative task manager', tech: ['Next.js', 'TypeScript', 'Socket.io'], link: 'https://project2.example.com' },
                { title: 'Project 3', desc: 'AI-powered content recommendation engine', tech: ['Python', 'TensorFlow', 'AWS'], link: 'https://project3.example.com' },
              ].map((project, index) => (
                <Card key={index} className="transform transition duration-500 hover:scale-105">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, i) => (
                        <Badge key={i} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                    <Button variant="outline" asChild>
                      <Link href={project.link} target="_blank" rel="noopener noreferrer">
                        View Project <ExternalLinkIcon className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>
        <motion.section 
          id="skills"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Skills & Expertise</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { category: 'Frontend', skills: ['React', 'Vue.js', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
                { category: 'Backend', skills: ['Node.js', 'Express', 'Django', 'PostgreSQL', 'MongoDB'] },
                { category: 'DevOps & Cloud', skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'] },
                { category: 'Tools & Methodologies', skills: ['Git', 'Agile', 'Scrum', 'JIRA', 'Figma'] },
                { category: 'Soft Skills', skills: ['Team Leadership', 'Problem Solving', 'Communication', 'Mentoring'] },
                { category: 'Currently Learning', skills: ['GraphQL', 'Rust', 'Web3', 'Machine Learning'] },
              ].map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>
        <motion.section 
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Let's Connect</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>Email: your.email@example.com</p>
                  <p>Location: City, Country</p>
                  <div className="flex space-x-4 mt-4">
                    <Button variant="outline" size="icon" asChild>
                      <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                        <GithubIcon className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                        <LinkedinIcon className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <Link href="mailto:your.email@example.com">
                        <MailIcon className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="link" className="p-0" asChild>
                    <Link href="/path-to-your-resume.pdf" target="_blank" rel="noopener noreferrer">
                      <FileTextIcon className="mr-2 h-4 w-4" /> Download Resume
                    </Link>
                  </Button>
                  <Button variant="link" className="p-0" asChild>
                    <Link href="https://yourblog.com" target="_blank" rel="noopener noreferrer">
                      <ExternalLinkIcon className="mr-2 h-4 w-4" /> Visit My Blog
                    </Link>
                  </Button>
                  <Button variant="link" className="p-0" asChild>
                    <Link href="https://github.com/yourusername?tab=repositories" target="_blank" rel="noopener noreferrer">
                      <GithubIcon className="mr-2 h-4 w-4" /> Open Source Contributions
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Your Name. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/privacy-policy" className="text-xs hover:underline underline-offset-4">Privacy Policy</Link>
          <Link href="/terms-of-service" className="text-xs hover:underline underline-offset-4">Terms of Service</Link>
        </nav>
      </footer>
    </div>
  )
}