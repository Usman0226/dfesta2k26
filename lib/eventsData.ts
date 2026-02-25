export interface Event {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: 'Technical' | 'Non-Technical' | 'Workshop';
    date: string;
    time: string;
    venue: string;
}

export const events: Event[] = [
    {
        id: '1',
        title: 'Code Crackers 2026',
        description: 'A 24-hour hackathon to solve real-world problems using Big Data and ML models.',
        icon: 'Database',
        category: 'Technical',
        date: 'March 15, 2026',
        time: '09:00 AM',
        venue: 'Main Auditorium'
    },
    {
        id: '2',
        title: 'Web Xpress',
        description: 'Live coding competition focused on optimizing deep learning architectures.',
        icon: 'Cpu',
        category: 'Technical',
        date: 'March 15, 2026',
        time: '02:00 PM',
        venue: 'Circular Block'
    },
    {
        id: '3',
        title: 'Data Pirates',
        description: 'Showcase your storytelling skills through interactive data visualizations.',
        icon: 'BarChart3',
        category: 'Technical',
        date: 'March 16, 2026',
        time: '10:00 AM',
        venue: 'Seminar Hall B'
    },
    {
        id: '4',
        title: 'Project Expo',
        description: 'Panel discussion on the societal impacts of Artificial General Intelligence.',
        icon: 'MessageSquare',
        category: 'Technical',
        date: 'March 16, 2026',
        time: '01:00 PM',
        venue: 'Conference Room 1'
    }
];
