-- Add new columns to user_security_settings table
ALTER TABLE IF EXISTS user_security_settings
ADD COLUMN IF NOT EXISTS biometric_signin_enabled BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS sms_approval_enabled BOOLEAN DEFAULT FALSE;
