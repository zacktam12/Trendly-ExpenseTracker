import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Shield,
  Zap,
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Smart Analytics",
      description:
        "Comprehensive expense tracking with detailed insights and spending pattern analysis.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Private",
      description:
        "Your financial data is protected with industry-standard encryption and privacy measures.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-Time Updates",
      description:
        "Get instant updates and live dashboard metrics as you track your expenses.",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Smart Categories",
      description:
        "Intelligent categorization helps you understand where your money goes.",
    },
  ];

  const stats = [
    { value: "98%", label: "User Satisfaction" },
    { value: "2.5M+", label: "Transactions Tracked" },
    { value: "150K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
  ];

  const handleWatchDemo = () => {
    // Demo video modal or redirect to demo video
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
  };

  const handleScheduleDemo = () => {
    // Redirect to scheduling platform like Calendly
    window.open("https://calendly.com/demo", "_blank");
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="border-b border-border backdrop-blur-md bg-background/80 dark:bg-gray-900/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Trendly
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#features"
                  className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Features
                </a>
                <a
                  href="#analytics"
                  className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Analytics
                </a>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
                <a
                  href="#features"
                  className="text-muted-foreground hover:text-foreground block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#analytics"
                  className="text-muted-foreground hover:text-foreground block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Analytics
                </a>
                <div className="pt-4 pb-3 border-t border-border">
                  <div className="flex flex-col space-y-2">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
              ✨ Smart Expense Tracking
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Track Your Expenses,
              </span>
              <br />
              <span className="text-foreground">Master Your Budget</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Take control of your finances with smart expense tracking,
              detailed analytics, and secure financial management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-6"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6"
                onClick={handleWatchDemo}
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Dashboard Preview */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Beautiful Dashboard
            </h2>
            <p className="text-xl text-muted-foreground">
              Real-time analytics at your fingertips
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center p-4 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-0">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Monthly Overview</h3>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold mb-2">$3,247.82</div>
                <div className="text-sm text-muted-foreground">
                  +12% from last month
                </div>
                <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Top Categories</h3>
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Food & Dining</span>
                    <span className="text-sm font-medium">$892</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Transportation</span>
                    <span className="text-sm font-medium">$456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Entertainment</span>
                    <span className="text-sm font-medium">$234</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Savings Goal</h3>
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold mb-2">78%</div>
                <div className="text-sm text-muted-foreground mb-4">
                  $3,120 of $4,000
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Analytics */}
      <section id="analytics" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
              📊 Smart Analytics
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Powerful Insights
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our analytics engine processes your spending data to deliver
              accurate insights and trend analysis for better financial
              decisions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Smart Features</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Expense Categorization</h4>
                    <p className="text-muted-foreground">
                      Automatically categorize your expenses for better tracking
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Spending Patterns</h4>
                    <p className="text-muted-foreground">
                      Identify trends and patterns in your spending habits
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Budget Management</h4>
                    <p className="text-muted-foreground">
                      Set budgets and track your progress towards financial
                      goals
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-0">
              <CardContent className="p-0">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                    Analytics Dashboard
                  </div>
                  <div className="text-muted-foreground mb-6">
                    Track your financial journey with detailed insights
                  </div>
                  <div className="relative h-32 mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 rounded-lg" />
                    <div className="absolute inset-4 bg-gradient-to-r from-blue-400 to-purple-400 opacity-30 rounded-lg" />
                    <div className="absolute inset-8 bg-gradient-to-r from-pink-400 to-blue-400 opacity-40 rounded-lg" />
                  </div>
                  <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
                    ✓ Ready to Use
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Features */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-green-500 to-teal-500 text-white border-0">
              🚀 Core Features
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover features that make personal finance management simple and
              effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Take Control of
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Finances?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of users who have transformed their financial
            management with Trendly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-6"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6"
              onClick={handleScheduleDemo}
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Trendly ExpenseTracker
          </div>
          <p className="text-slate-400 mb-6">
            © 2025 Trendly ExpenseTracker. All rights reserved.
          </p>

          {/* Existing Links */}
          <div className="flex justify-center gap-6 text-sm text-slate-400 mb-6">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="/contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>

          {/* Contact Icons */}
          <div className="flex justify-center gap-6 text-slate-400 text-xl">
            {/* Email Icon */}
            <a
              href="mailto:zekariastamiru12@gmail.com"
              className="hover:text-white transition-colors"
              aria-label="Email"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4
                   c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v.01L12 13
                   20 6.01V6H4zm0 12h16V8l-8 5-8-5v10z"
                />
              </svg>
            </a>

            {/* GitHub Icon */}
            <a
              href="https://github.com/zacktam12"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577
             0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 17.07
             3.633 16.7 3.633 16.7c-1.087-.744.083-.729.083-.729 1.204.085 1.838
             1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.304.762-1.604
             -2.665-.305-5.467-1.334-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176
             0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.005 2.047.138 3.003.404
             2.29-1.552 3.296-1.23 3.296-1.23.653 1.653.242 2.874.12 3.176.77.84
             1.233 1.91 1.233 3.22 0 4.61-2.807 5.624-5.48 5.92.43.372.823 1.102.823
             2.222 0 1.604-.015 2.896-.015 3.29 0 .32.19.694.8.576C20.565
             21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"
                />
              </svg>
            </a>

            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/in/zekariastamiru"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path
                  d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0
               2.76 2.24 5 5 5h14c2.76 0 5-2.24
               5-5v-14c0-2.76-2.24-5-5-5zm-11
               19h-3v-10h3v10zm-1.5-11.27c-.97
               0-1.75-.79-1.75-1.75s.78-1.75
               1.75-1.75 1.75.78 1.75 1.75-.78
               1.75-1.75 1.75zm13.5 11.27h-3v-5.6c0-3.36-4-3.1-4
               0v5.6h-3v-10h3v1.39c1.4-2.59
               7-2.78 7 2.47v6.14z"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
