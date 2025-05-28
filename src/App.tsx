import { useState } from 'react'
import './App.css'

function App() {

  type FormDataType = { 
    firstName: string;
    lastName: string;
    email: string;
    queryType: string;
    message: string;
    consent: boolean;
  }

  const [formData, setFormData] = useState<FormDataType>({
    firstName: '',
    lastName: '',
    email: '',
    queryType: '',
    message: '',
    consent: false,
  });

  const [didEdit, setDidEdit] = useState<Partial<Record<keyof FormDataType, boolean>>>({
    firstName: false,
    lastName: false,
    email: false,
    queryType: false,
    message: false,
    consent: false,
  });

  const handleBlur = (identifier: keyof FormDataType) => {
    setDidEdit(prevEdit => ({
      ...prevEdit,
      [identifier]: true
    }));
  }

  const handleInput = (field: keyof FormDataType, value: string | boolean) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));

    if (typeof value === 'string' && value.trim() !== '') {
      const isOnlyLetters = /^[A-Za-zÀ-ÿ\s'-]+$/.test(value);
      if (
        (field === 'firstName' && value.length >= 3 && isOnlyLetters) ||
        (field === 'lastName' && value.length >= 3 && isOnlyLetters) ||
        (field === 'message' && value.length >= 10) ||
        (field === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) ||
        (field === 'queryType' && value !== '')
      ) {
        setDidEdit(prev => ({ ...prev, [field]: false }));
      }
    }

    if (field === 'consent' && value === true) {
      setDidEdit(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isOnlyLetters = /^[A-Za-zÀ-ÿ\s'-]+$/;

    const isValid =
      formData.firstName.trim().length >= 3 && isOnlyLetters.test(formData.firstName) &&
      formData.lastName.trim().length >= 3 && isOnlyLetters.test(formData.lastName) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.queryType !== '' &&
      formData.message.trim().length >= 10 &&
      formData.consent === true;

    if (!isValid) {
      setDidEdit({
        firstName: true,
        lastName: true,
        email: true,
        queryType: true,
        message: true,
        consent: true
      });
      console.error("Form validation failed. Please check the errors.");
      return;
    }

    console.log("Form Data Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} id="contactForm">
      <h1>Contact Us</h1>

      <div className="form-description">
        <div className="input-text">
          <label htmlFor="firstName">First Name:</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName"
            onChange={e => handleInput('firstName', e.target.value)}
            onBlur={() => handleBlur("firstName")}
            value={formData.firstName}
          />
          <div className="error-message">
            {didEdit.firstName && formData.firstName.trim().length < 3 && (
              <span className="error">First name must be at least 3 characters.</span>
            )}
            {didEdit.firstName && formData.firstName && !/^[A-Za-zÀ-ÿ\s'-]+$/.test(formData.firstName) && (
              <span className="error">First name must contain only letters.</span>
            )}
          </div>
        </div>

        <div className="input-text">
          <label htmlFor="lastName">Last Name:</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName"
            onChange={e => handleInput('lastName', e.target.value)}
            onBlur={() => handleBlur('lastName')}
            value={formData.lastName}
          />
          <div className="error-message">
            {didEdit.lastName && formData.lastName.trim().length < 3 && (
              <span className="error">Last name must be at least 3 characters.</span>
            )}
            {didEdit.lastName && formData.lastName && !/^[A-Za-zÀ-ÿ\s'-]+$/.test(formData.lastName) && (
              <span className="error">Last name must contain only letters.</span>
            )}
          </div>
        </div>

        <div className="input-text">
          <label htmlFor="email">Email Address:</label>
          <input 
            type="text" 
            id="email" 
            name="email"
            onChange={e => handleInput('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            value={formData.email}
          />
          <div className="error-message">
            {didEdit.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
              <span className="error">Please enter a valid email address.</span>
            )}
          </div>
        </div>
      </div>

      <div className="form-options">
        <legend>Query Type:</legend>

        <div className="input-radio">
          <input 
            type="radio" 
            id="queryType1" 
            name="queryType"
            value="General Enquiry"
            onChange={e => handleInput("queryType", e.target.value)}
            onBlur={() => handleBlur('queryType')}
            checked={formData.queryType === "General Enquiry"}
          />
          <label htmlFor="queryType1">General Enquiry</label>
        </div>

        <div className="input-radio">
          <input 
            type="radio" 
            id="queryType2" 
            name="queryType"
            value="Support Request"
            onChange={e => handleInput("queryType", e.target.value)}
            onBlur={() => handleBlur("queryType")}
          />
          <label htmlFor="queryType2">Support Request</label>
        </div>

        {didEdit.queryType && !formData.queryType && (
          <div className="error-message">
            <span className="error">Please select a query type.</span>
          </div>
        )}
      </div>

      <div className="form-message">
        <label htmlFor="message">Message:</label>
        <textarea 
          id="message" 
          name="message"  
          rows={4}
          onChange={e => handleInput('message', e.target.value)}
          onBlur={() => handleBlur('message')} 
          value={formData.message}
        ></textarea>
        <div className="error-message">
          {didEdit.message && formData.message.trim().length < 10 && (
            <span className="error">Message must be at least 10 characters.</span>
          )}
        </div>
      </div>

      <div className="form-consent">
        <input 
          type="checkbox" 
          id="consent"
          name="consent"
          onChange={e => handleInput("consent", e.target.checked)}
          onBlur={() => handleBlur("consent")}
          checked={formData.consent}
        />
        <label htmlFor="consent">I consent to being contacted by the team.</label>
        {didEdit.consent && !formData.consent && (
          <div className="error-message">
            <span className="error">You must consent to be contacted.</span>
          </div>
        )}
      </div>

      <button className="form-submit" type="submit">Submit</button>
    </form>
  );
}

export default App;
