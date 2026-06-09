import { AvatarContainer } from "./styles";

type AvatarProps = {
  avatar?: string;
  name?: string;
  size?: "sm" | "lg";
};

function stringToHue(str: string) {
  // simple deterministic hash to a hue value [0, 360)
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // char code and mix
    // keep it within 32-bit signed int range
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 360;
}

function getInitials(name = "") {
  if (!name) return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  const first = parts[0].charAt(0).toUpperCase();
  const last = parts[parts.length - 1].charAt(0).toUpperCase();
  return `${first}${last}`;
}

function Avatar({ avatar, name, size = "sm" }: AvatarProps) {
  const initials = getInitials(name || "");
  const hue = stringToHue(name || initials || "default");
  const background = `hsl(${hue}deg 70% 45%)`;

  return (
    <AvatarContainer style={{ background }} data-initials={initials}>
      {avatar ? (
        <img src={avatar} alt={`${name || "avatar"}-logo`} />
      ) : (
        <span className={`initials ${size}`}>{initials}</span>
      )}
    </AvatarContainer>
  );
}

export { Avatar };
