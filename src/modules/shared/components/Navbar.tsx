import { Navbar as FlowbiteNavbar } from "flowbite-react"

interface NavbarProps {
    homeHref: string;
    links: {
        name: string;
        href?: string;
        onClick?: React.MouseEventHandler<HTMLAnchorElement>
    }[]
}

export default function Navbar({homeHref, links} : NavbarProps) {
    return (
        <FlowbiteNavbar fluid rounded>
        <FlowbiteNavbar.Brand href={homeHref}>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">O sistema de reservas</span>
        </FlowbiteNavbar.Brand>
    
        <FlowbiteNavbar.Toggle />
    
        <FlowbiteNavbar.Collapse>
            {links.map(link => (
                <FlowbiteNavbar.Link onClick={link.onClick} href={link.href}>{link.name}</FlowbiteNavbar.Link>
            ))}
        </FlowbiteNavbar.Collapse>
      </FlowbiteNavbar>
    );
}