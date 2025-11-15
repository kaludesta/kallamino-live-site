
import { Event, TeamMember, BlogPost, Resource, GalleryImage, MembershipSubmission, Partner } from '../types';

export const initialEvents: Event[] = [
  {
    id: 1,
    title: 'Intro to Blockchain 101',
    date: '2024-10-15',
    time: '6:00 PM',
    location: 'Auditorium',
    description: 'A beginner-friendly session covering the fundamentals of blockchain technology, cryptocurrencies, and their potential applications. No prior knowledge required!',
    registrationLink: '#',
    image: 'https://picsum.photos/seed/event1/600/400'
  },
  {
    id: 2,
    title: 'Smart Contracts Workshop with Solidity',
    date: '2024-11-05',
    time: '5:30 PM',
    location: 'Tech Lab 2',
    description: 'A hands-on workshop where you\'ll learn to write, deploy, and interact with your first smart contract on the Ethereum blockchain using Solidity.',
    registrationLink: '#',
    image: 'https://picsum.photos/seed/event2/600/400'
  },
];

export const initialTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Club President',
    bio: 'Fascinated by decentralized systems and their potential to revolutionize industries. Leading the club to explore the frontiers of blockchain technology.',
    image: 'https://picsum.photos/seed/person1/400/400'
  },
  {
    id: 2,
    name: 'Maria Garcia',
    role: 'Head of Technology',
    bio: 'A passionate developer and tech enthusiast. Manages the club\'s technical projects, workshops, and our open-source contributions.',
    image: 'https://picsum.photos/seed/person2/400/400'
  },
  {
    id: 3,
    name: 'Sam Lee',
    role: 'Events Coordinator',
    bio: 'Organizing engaging and informative events to build a strong, educated, and connected blockchain community within our school.',
    image: 'https://picsum.photos/seed/person3/400/400'
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Our Vision for a Decentralized Future',
    author: 'Alex Johnson',
    date: '2024-09-01',
    summary: 'Welcome to the official blog of the Kallamino Blockchain Community! Here, we outline our goals, our passion for technology, and what you can expect from our club this year.',
    content: '<p>In a world of rapidly evolving technology, we believe that understanding the principles of decentralization is more important than ever. Our club was founded on the idea that blockchain is not just about cryptocurrency; it\'s a foundational technology that can reshape industries from finance to art, governance to supply chains.</p><p>Our mission is to demystify blockchain for everyone, from absolute beginners to seasoned coders. We plan to host a series of workshops, invite guest speakers from the industry, and work on collaborative projects that put theory into practice. Join us on this exciting journey to build, learn, and innovate together!</p>',
    image: 'https://picsum.photos/seed/blog1/800/400'
  },
  {
    id: 2,
    title: 'Recap: Blockchain 101 Kickoff Event',
    author: 'Sam Lee',
    date: '2024-10-16',
    summary: 'Our first event of the year was a massive success! We had a full house for our "Intro to Blockchain 101" session. Here\'s a quick recap for those who missed it.',
    content: '<p>The turnout for our kickoff event was incredible! We covered the basics of what a blockchain is, how it works, and why it\'s considered so secure. We discussed key concepts like blocks, chains, hashing, and consensus mechanisms. The Q&A session was particularly lively, with great questions about Bitcoin, Ethereum, and NFTs.</p><p>Thank you to everyone who attended and made it such an engaging evening. The slides from the presentation are now available on our Resources page. Stay tuned for our next event, a hands-on Smart Contracts workshop!</p>',
    image: 'https://picsum.photos/seed/blog2/800/400'
  },
];

export const initialResources: Resource[] = [
  {
    id: 1,
    title: 'Blockchain 101 Presentation Slides',
    type: 'Slides',
    description: 'The complete presentation slides from our introductory session on blockchain fundamentals.',
    url: '#'
  },
  {
    id: 2,
    title: 'Mastering Ethereum Book (PDF)',
    type: 'PDF',
    description: 'A comprehensive guide to understanding the Ethereum blockchain and developing decentralized applications.',
    url: '#'
  },
  {
    id: 3,
    title: 'Solidity Crash Course (Video)',
    type: 'Tutorial',
    description: 'A recommended video tutorial for beginners looking to get started with the Solidity programming language for smart contracts.',
    url: '#'
  },
  {
    id: 4,
    title: 'Coinbase Learn',
    type: 'Link',
    description: 'An excellent external resource for learning about various cryptocurrencies and blockchain concepts in a simple, digestible format.',
    url: '#'
  }
];

export const initialGalleryImages: GalleryImage[] = [
    { id: 1, src: 'https://picsum.photos/seed/gallery1/600/400', alt: 'Event photo 1', album: 'Blockchain 101 Kickoff' },
    { id: 2, src: 'https://picsum.photos/seed/gallery2/600/400', alt: 'Event photo 2', album: 'Blockchain 101 Kickoff' },
    { id: 3, src: 'https://picsum.photos/seed/gallery3/600/400', alt: 'Event photo 3', album: 'Blockchain 101 Kickoff' },
    { id: 4, src: 'https://picsum.photos/seed/gallery4/600/400', alt: 'Workshop photo 1', album: 'Solidity Workshop' },
    { id: 5, src: 'https://picsum.photos/seed/gallery5/600/400', alt: 'Workshop photo 2', album: 'Solidity Workshop' },
    { id: 6, src: 'https://picsum.photos/seed/gallery6/600/400', alt: 'Team photo 1', album: 'Club Meetings' },
];

export const initialSubmissions: MembershipSubmission[] = [];

export const initialPartners: Partner[] = [];
