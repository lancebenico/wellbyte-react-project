import { Building2, Users, Sparkles, Heart } from 'lucide-react'
import { HOME_IMAGE_PATHS } from './assets'

export const HOME_FEATURE_CARDS = {
  left: [
    {
      icon: Building2,
      title: 'A Heritage of Excellence in Computing Education',
      gradient: 'from-cics-red-dark via-cics-red to-cics-red-muted',
      image: HOME_IMAGE_PATHS.home1,
    },
    {
      icon: Users,
      title: 'A Community That Welcomes and Supports You',
      gradient: 'from-cics-red-deep via-cics-red-dark to-cics-red',
      image: HOME_IMAGE_PATHS.home2,
    },
  ],
  right: [
    {
      icon: Sparkles,
      title: 'Planning and Habits You Can Rely On',
      gradient: 'from-[#5c0010] via-cics-red-dark to-cics-red',
      image: HOME_IMAGE_PATHS.home3,
    },
    {
      icon: Heart,
      title: 'Experiences That Nurture Lasting Well-Being',
      gradient: 'from-cics-red via-cics-red-muted to-cics-red-light',
      image: HOME_IMAGE_PATHS.home4,
    },
  ],
}

export const HOME_COPY = {
  brandLine1: 'University of Santo Tomas',
  brandLine2: 'WellByte',
  welcomePrefix: 'Welcome to the Start of Your Balanced Journey at UST CICS,',
  portalDescription:
    'WellByte is your all-in-one wellness and time-management portal, designed for College of Information and Computing Sciences students who want to stay organized, mindful, and well throughout the term.',
  todayLabel: 'Today',
  quoteTitle: 'Quote of the Day',
  taskSummaryTitle: 'Your Task Summary',
  dashboardCta: 'Access Wellness Dashboard',
  footerNote: 'Everything you need in one place. Your Thomasian journey at CICS',
  footerEmphasis: 'starts here',
  calendarLink: 'View Academic Calendar',
  aboutTitle: 'About WellByte',
  aboutParagraphs: [
    'WellByte brings together task planning, calendar scheduling, mood reflection, and mindful focus sessions so you can manage demanding coursework without losing sight of your health. Plans sync securely across your devices when you sign in with your CICS Google account.',
    'Whether you are mapping deadlines for a capstone project or carving out quiet time between classes, WellByte helps you work with intention—and rest with purpose.',
  ],
}
