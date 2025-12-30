
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ConverterCard from './components/ConverterCard';
import DaysInYearTool from './components/DaysInYearTool';
import { DateDifferenceTool, DaysFromNowTool, DaysFromDateTool } from './components/tools/DateCalculators';
import { SalaryToHourlyTool, HourlyToAnnualTool } from './components/tools/SalaryCalculators';
import { AboutPage, PrivacyPage, TermsPage, HelpPage, LandingPage } from './components/StaticPages';
import UnitReferencePage from './components/UnitReferencePage';
import UnitIndexPage from './components/UnitIndexPage';
import { ALL_TOOLS } from './constants'; 
import ScrollToTop from './components/ScrollToTop';
import CookieNotice from './components/CookieNotice';

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Main tool routes */}
          {ALL_TOOLS.map(tool => {
            let element;
            
            // Route to specific calculator components based on tool ID
            switch (tool.id) {
                case 'days_in_year':
                    element = <DaysInYearTool tool={tool} />;
                    break;
                case 'date_diff':
                    element = <DateDifferenceTool tool={tool} />;
                    break;
                case 'days_from_now':
                    element = <DaysFromNowTool tool={tool} />;
                    break;
                case 'days_from_date':
                    element = <DaysFromDateTool tool={tool} />;
                    break;
                case 'salary_hourly':
                    element = <SalaryToHourlyTool tool={tool} />;
                    break;
                case 'hourly_annual':
                    element = <HourlyToAnnualTool tool={tool} />;
                    break;
                default:
                    // Default to standard unit converter layout
                    element = <ConverterCard tool={tool} />;
            }

            return (
                <Route 
                  key={tool.id} 
                  path={`/${tool.id}`} 
                  element={element} 
                />
            );
          })}

          {/* Unit Encyclopedia routes */}
          <Route path="/units" element={<UnitIndexPage />} />
          <Route path="/unit/:unitId" element={<UnitReferencePage />} />

          {/* Core static pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/help" element={<HelpPage />} />

          {/* Fallback to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <CookieNotice />
      </Layout>
    </HashRouter>
  );
};

export default App;
