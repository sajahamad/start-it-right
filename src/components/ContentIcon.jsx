import {
  Backpack,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  Clock,
  Code2,
  Compass,
  GraduationCap,
  Languages,
  Laptop,
  Palette,
  Scale,
  Sprout,
  Stethoscope,
} from 'lucide-react';

const ICONS = {
  book: BookOpen,
  compass: Compass,
  scale: Scale,
  'graduation-cap': GraduationCap,
  backpack: Backpack,
  clock: Clock,
  chart: BarChart3,
  laptop: Laptop,
  sprout: Sprout,
  building: Building2,
  code: Code2,
  languages: Languages,
  stethoscope: Stethoscope,
  palette: Palette,
  briefcase: Briefcase,
};

function ContentIcon({ name, className = 'h-6 w-6' }) {
  const Icon = ICONS[name];
  if (!Icon) return null;
  return <Icon className={className} strokeWidth={1.75} aria-hidden="true" />;
}

export default ContentIcon;
