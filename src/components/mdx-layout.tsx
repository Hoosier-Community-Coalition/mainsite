import { HCCFooter, HCCPageContainer, HCCPageTextContainer } from "./core-components"

export function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (<HCCPageContainer> {children}</HCCPageContainer>);
}