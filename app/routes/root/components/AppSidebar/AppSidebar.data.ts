import { BookOpen, House, Settings2, SquareTerminal, Award, GraduationCap, ChartArea, Sofa} from "lucide-react";



export const routes =[
    {
        title: "Home",
        url: "/",
        icon: House
    },

    {
        title: "Cursos",
        url: "/courses",
        icon: SquareTerminal
    },
    {
        title: "Mis Cursos",
        url: "/my-courses",
        icon: BookOpen
    },
    {
        title: "Lounge",
        url: "/lounge",
        icon: Sofa
    },
    {
        title: "Certificados",
        url: "/certifications",
        icon: Award
    },
    {
        title: "Ajustes",
        url: "/settings",
        icon: Settings2
    }
];

export const routesTeacher = [
    {
        title: "Cursos",
        url: "/teacher",
        icon: GraduationCap
    },
    {
        title: "Analíticas",
        url: "/teacher/analytics",
        icon: ChartArea,
    }
]