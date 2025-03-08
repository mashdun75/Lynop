-- Create wallet tables
CREATE TABLE IF NOT EXISTS wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  balance DECIMAL(12, 2) DEFAULT 0.00,
  currency VARCHAR(3) DEFAULT 'USD',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  type VARCHAR(20) NOT NULL, -- 'card', 'bank', 'digital_wallet'
  name VARCHAR(255) NOT NULL,
  details JSONB,
  is_default BOOLEAN DEFAULT FALSE,
  provider VARCHAR(50), -- 'stripe', 'plaid', 'apple_pay', 'google_pay', etc.
  external_id VARCHAR(255), -- ID from the payment provider
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS wallet_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_id UUID NOT NULL,
  user_id UUID NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  type VARCHAR(20) NOT NULL, -- 'deposit', 'withdrawal', 'transfer', 'payment'
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'cancelled'
  payment_method_id UUID,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (wallet_id) REFERENCES wallets(id),
  FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id)
);

-- Add RLS policies
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;

-- Wallet policies
CREATE POLICY "Users can view their own wallets"
  ON wallets FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own wallets"
  ON wallets FOR UPDATE
  USING (user_id = auth.uid());

-- Payment method policies
CREATE POLICY "Users can view their own payment methods"
  ON payment_methods FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own payment methods"
  ON payment_methods FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own payment methods"
  ON payment_methods FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own payment methods"
  ON payment_methods FOR DELETE
  USING (user_id = auth.uid());

-- Transaction policies
CREATE POLICY "Users can view their own transactions"
  ON wallet_transactions FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own transactions"
  ON wallet_transactions FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Enable realtime for these tables
ALTER PUBLICATION supabase_realtime ADD TABLE wallets;
ALTER PUBLICATION supabase_realtime ADD TABLE payment_methods;
ALTER PUBLICATION supabase_realtime ADD TABLE wallet_transactions;
