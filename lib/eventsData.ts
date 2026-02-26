export interface Event {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: 'Technical' | 'Non-Technical' | 'Workshop';
    date: string;
    time: string;
    venue: string;
    studentCoordinator?: { name: string; phone: string };
    teamLeader?: { name: string; phone: string };
    teamMembers?: string[];
    facultyCoordinator?: { name: string; phone: string };
}

export const events: Event[] = [
    {
        id: '1',
        title: 'Code Crackers',
        description: 'A 24-hour hackathon to solve real-world problems using algorithms and ML models.',
        icon: 'Database',
        category: 'Technical',
        date: 'March 15, 2026',
        time: '09:00 AM',
        venue: 'Main Auditorium',
        studentCoordinator: { name: 'Balaji', phone: '6301694517' },
        teamLeader: { name: 'A. Vijaya Lakshmi', phone: '9440372677' },
        teamMembers: ['K. Vennela', 'B. Vandana', 'P. Tejesh Reddy', 'T. Tharun Kumar'],
        facultyCoordinator: { name: 'Dr. S. Gopalakrishnan', phone: '9003253250' }
    },
    {
        id: '2',
        title: 'Web Xpress',
        description: 'Live web development competition focused on UI/UX and optimizing frontend architectures.',
        icon: 'Cpu',
        category: 'Technical',
        date: 'March 15, 2026',
        time: '02:00 PM',
        venue: 'Circular Block',
        studentCoordinator: { name: 'Hari', phone: '9346790823' },
        teamLeader: { name: 'S. Afifa Anjum', phone: '8121344311' },
        teamMembers: ['G. Akhila', 'R. Chandana', 'A. Asaad', 'G. Fahad'],
        facultyCoordinator: { name: 'Dr. M. Kiran Kumar', phone: '8919277474' }
    },
    {
        id: '3',
        title: 'Data Pirates',
        description: 'Showcase your storytelling skills through interactive data visualizations and analytics.',
        icon: 'BarChart3',
        category: 'Technical',
        date: 'March 16, 2026',
        time: '10:00 AM',
        venue: 'Seminar Hall B',
        studentCoordinator: { name: 'A. Vivekananda Reddy', phone: '6309408850' },
        teamLeader: { name: 'C. Hemanjali', phone: '7989666968' },
        teamMembers: ['Vinmaya', 'Niharika', 'K. Nikhil', 'Gangaiah'],
        facultyCoordinator: { name: 'Mr. Rajkumar. G', phone: '9944348944' }
    },
    {
        id: '4',
        title: 'Project Expo',
        description: 'Present your innovative working models and capstone projects to industry experts.',
        icon: 'MessageSquare',
        category: 'Technical',
        date: 'March 16, 2026',
        time: '01:00 PM',
        venue: 'Conference Room 1',
        studentCoordinator: { name: 'C. Susmitha', phone: '7995017626' },
        teamLeader: { name: 'K. Lokeswar', phone: '7989239624' },
        teamMembers: ['Manohar', 'Pranathi', 'Lakshmi prashanthi', 'Joshna'],
        facultyCoordinator: { name: 'Mrs. S. Manjula', phone: '7708932308' }
    },
    {
        id: '5',
        title: 'AI Quest',
        description: 'Test your knowledge on cutting edge Artificial Intelligence and Machine Learning concepts.',
        icon: 'BrainCircuit',
        category: 'Technical',
        date: 'March 15, 2026',
        time: '11:00 AM',
        venue: 'Lab 4',
        studentCoordinator: { name: 'Ranjith', phone: '9346311702' },
        teamLeader: { name: 'G. Fajil Sami Arfath', phone: '9949122834' },
        teamMembers: ['Charitha', 'Bindu', 'Ganesh', 'Dwarka'],
        facultyCoordinator: { name: 'Mrs. T. Swetha', phone: '8688225397' }
    },
    {
        id: '6',
        title: 'Tech Trivia',
        description: 'The ultimate quiz to prove your tech geek status across networking, hardware, and coding.',
        icon: 'Terminal',
        category: 'Technical',
        date: 'March 16, 2026',
        time: '10:00 AM',
        venue: 'Auditorium 2',
        studentCoordinator: { name: 'Nandhini', phone: '8639910672' },
        teamLeader: { name: 'N.V.Revathi', phone: '6309114732' },
        teamMembers: ['P.Rohitha', 'C.Sameera', 'P.Abdul Rehman Khan', 'Babjan'],
        facultyCoordinator: { name: 'Mr. T. Balaji', phone: '9894228927' }
    },
    {
        id: '7',
        title: 'Cyber Secure',
        description: 'Capture the flag style event testing your penetration testing and defense skills.',
        icon: 'ShieldAlert',
        category: 'Technical',
        date: 'March 15, 2026',
        time: '02:00 PM',
        venue: 'Security Lab',
        studentCoordinator: { name: 'Divakar', phone: '6305715116' },
        teamLeader: { name: 'B.MD.Vaseem', phone: '7674853972' },
        teamMembers: ['G.Kousar', 'B.Hemalatha', 'Syed Shahid Alisha'],
        facultyCoordinator: { name: 'Mrs. M. Nandhini', phone: '9025360983' }
    },
    {
        id: '8',
        title: 'GameJam',
        description: 'Develop a functional 2D game prototype in under 24 hours based on a surprise theme.',
        icon: 'Gamepad2',
        category: 'Technical',
        date: 'March 16, 2026',
        time: '09:00 AM',
        venue: 'Design Studio',
        studentCoordinator: { name: 'J. Sumanth', phone: '9059853658' },
        teamLeader: { name: 'Ch.pravallika', phone: '7780738136' },
        teamMembers: ['D.pujitha', 'B.manasa', 'R.prathap', 'G.maruthi'],
        facultyCoordinator: { name: 'Mrs. R. Roopa', phone: '9948044393' }
    },
    {
        id: '9',
        title: 'Cloud Race',
        description: 'Fastest team to deploy and scale a microservices architecture on AWS wins.',
        icon: 'CloudLightning',
        category: 'Technical',
        date: 'March 15, 2026',
        time: '01:00 PM',
        venue: 'Cloud Lab',
        studentCoordinator: { name: 'Rakshitha', phone: '6304000349' },
        teamLeader: { name: 'D.Pavan', phone: '7569952815' },
        teamMembers: ['M.Prathap Reddy', 'K.Ganesh', 'V.Bindu Sri', 'T.Akhilandeswari'],
        facultyCoordinator: { name: 'Mr. Sheik Jamil Ahmed', phone: '9108267990' }
    },
    {
        id: '10',
        title: 'Prompt Masters',
        description: 'Battle of AI prompt engineering. Generate the best output using limited words.',
        icon: 'Sparkles',
        category: 'Non-Technical',
        date: 'March 16, 2026',
        time: '03:00 PM',
        venue: 'Main Library',
        studentCoordinator: { name: 'Lokesh', phone: '8520884617' },
        facultyCoordinator: { name: 'Mr. G. Kiran Kumar', phone: '8585854939' }
    },
    {
        id: '11',
        title: 'Paper Presentation',
        description: 'Present your research papers to an esteemed panel of professors and researchers.',
        icon: 'FileText',
        category: 'Technical',
        date: 'March 15, 2026',
        time: '10:00 AM',
        venue: 'Conference Hall A',
        teamLeader: { name: 'S. Suheal', phone: '9390535370' },
        teamMembers: ['M. Supriya', 'D. Vishnupriya', 'Y. Vishnupriya'],
        facultyCoordinator: { name: 'Mrs. F. Twinkle Graf', phone: '8903279850' }
    },
    {
        id: '12',
        title: 'Idea Pitching',
        description: 'Got a startup idea? Pitch it to simulated investors and receive critical feedback.',
        icon: 'Lightbulb',
        category: 'Non-Technical',
        date: 'March 16, 2026',
        time: '11:00 AM',
        venue: 'Seminar Hall C',
        teamLeader: { name: 'S.MD.Sajeed', phone: '9381510845' },
        teamMembers: ['V.Naveen', 'S.Azkiya Anjum', 'U.Supriya']
    },
    {
        id: '13',
        title: 'Design Sprint',
        description: 'End to end product design challenge focusing on human-computer interaction.',
        icon: 'PenTool',
        category: 'Workshop',
        date: 'March 15, 2026',
        time: '02:00 PM',
        venue: 'Innovation Hub',
        teamLeader: { name: 'Y.Vikash', phone: '9701439940' },
        teamMembers: ['P.Thanay Kishan', 'B.Teja Abhishay', 'T.Yugesh', 'P.Sailaja', 'P.Sravani', 'T.Sai Joshwika'],
        facultyCoordinator: { name: 'Mrs. Anuradha Prudhivi', phone: '8639739550' }
    },
    {
        id: '14',
        title: 'Treasure Hunt',
        description: 'Decode cryptic clues scattered around the campus to find the hidden grand prize.',
        icon: 'Map',
        category: 'Non-Technical',
        date: 'March 16, 2026',
        time: '04:00 PM',
        venue: 'Campus Grounds',
        teamLeader: { name: 'R.Devi Varshita', phone: '8978350171' },
        teamMembers: ['J.R. Bhagyashree', 'M.Dharshini', 'E. Divya', 'S. Gnana Siri'],
        facultyCoordinator: { name: 'Mr. A. Kalyan Kumar', phone: '7416518058' }
    }
];
