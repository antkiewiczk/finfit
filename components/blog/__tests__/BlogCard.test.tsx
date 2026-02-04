import { render, screen } from "@testing-library/react";
import Link from "next/link";
import BlogCard from "../BlogCard";
import type { PostMetadata } from "@/lib/content";

const mockPost: PostMetadata = {
  slug: "finance/test-post",
  title: "Test Post",
  description: "This is a test post description",
  date: "2026-01-20",
  category: "finance",
  tags: ["budgeting", "saving"],
  readingTime: "5 min read",
};

jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  };
});

jest.mock("next/image", () => {
  return function MockImage({ alt, src, ...props }: any) {
    return <img alt={alt} src={src} {...props} />;
  };
});

describe("BlogCard", () => {
  it("renders blog post information correctly", () => {
    render(<BlogCard post={mockPost} />);

    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test post description"),
    ).toBeInTheDocument();
    expect(screen.getByText("Finance")).toBeInTheDocument();
    expect(screen.getByText("January 20, 2026")).toBeInTheDocument();
    expect(screen.getByText("5 min read")).toBeInTheDocument();
    expect(screen.getByText("#budgeting")).toBeInTheDocument();
    expect(screen.getByText("#saving")).toBeInTheDocument();
  });

  it("displays the correct category badge styling for finance", () => {
    render(<BlogCard post={mockPost} />);

    const categoryBadge = screen.getByText("Finance");
    expect(categoryBadge).toHaveClass(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 dark:from-teal-900 dark:to-cyan-900 dark:text-teal-200",
    );
  });

  it("displays the correct category badge styling for fitness", () => {
    const fitnessPost = { ...mockPost, category: "fitness" as const };
    render(<BlogCard post={fitnessPost} />);

    const categoryBadge = screen.getByText("Fitness");
    expect(categoryBadge).toHaveClass(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 dark:from-emerald-900 dark:to-green-900 dark:text-emerald-200",
    );
  });

  it("limits displayed tags to 3 and shows count when more exist", () => {
    const postWithManyTags = {
      ...mockPost,
      tags: ["budgeting", "saving", "investing", "retirement"],
    };

    render(<BlogCard post={postWithManyTags} />);

    expect(screen.getByText("#budgeting")).toBeInTheDocument();
    expect(screen.getByText("#saving")).toBeInTheDocument();
    expect(screen.getByText("#investing")).toBeInTheDocument();
    expect(screen.getByText("+1")).toBeInTheDocument();
    expect(screen.queryByText("#retirement")).not.toBeInTheDocument();
  });

  it("renders cover image when provided", () => {
    const postWithImage = {
      ...mockPost,
      coverImage: "/images/test-image.webp",
    };

    render(<BlogCard post={postWithImage} />);

    const image = screen.getByAltText("Test Post");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "/images/test-image.webp?fm=webp&w=800&q=70",
    );
  });

  it("links to the correct blog post URL", () => {
    render(<BlogCard post={mockPost} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/blog/finance/test-post");
  });

  it('shows "Read more" text on hover', () => {
    render(<BlogCard post={mockPost} />);

    expect(screen.getByText("Read more →")).toBeInTheDocument();
  });
});
