export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-center text-sm text-slate-400">
        <span>
          &copy; {new Date().getFullYear()} Hamza Wako. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
