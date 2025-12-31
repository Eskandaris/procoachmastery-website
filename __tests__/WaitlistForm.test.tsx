import { render, screen } from '@testing-library/react';
import { WaitlistForm } from '@/components/WaitlistForm';

const mockMessages = {
  title: 'Schrijf je in voor de wachtlijst',
  name: 'Naam',
  email: 'E-mail',
  note: 'Opmerking (optioneel)',
  consent: 'Ik geef toestemming om per e-mail updates te ontvangen.',
  submit: 'Inschrijven',
  successTitle: 'Je staat op de wachtlijst!',
  successBody: 'Dank je wel. We houden je op de hoogte.',
  nameRequired: 'Naam is verplicht',
  emailRequired: 'E-mail is verplicht',
  emailInvalid: 'Voer een geldig e-mailadres in',
  consentRequired: 'Je moet toestemming geven om updates te ontvangen',
};

describe('WaitlistForm', () => {
  it('renders form fields correctly', () => {
    render(<WaitlistForm messages={mockMessages} />);
    
    expect(screen.getByLabelText(/naam/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/opmerking/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /inschrijven/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty form', async () => {
    render(<WaitlistForm messages={mockMessages} />);
    
    const submitButton = screen.getByRole('button', { name: /inschrijven/i });
    submitButton.click();
    
    // Wait for validation errors
    await screen.findByText(/naam is verplicht/i);
    await screen.findByText(/e-mail is verplicht/i);
    await screen.findByText(/je moet toestemming geven/i);
  });

  it('validates email format', async () => {
    render(<WaitlistForm messages={mockMessages} />);
    
    const nameInput = screen.getByLabelText(/naam/i);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const checkbox = screen.getByRole('checkbox');
    const submitButton = screen.getByRole('button', { name: /inschrijven/i });
    
    nameInput.value = 'Test User';
    emailInput.value = 'invalid-email';
    checkbox.checked = true;
    
    submitButton.click();
    
    await screen.findByText(/voer een geldig e-mailadres in/i);
  });
});

