import { supabase } from '../lib/supabase';

interface EmailNotification {
  to: string;
  subject: string;
  body: string;
  type: 'order_confirmation' | 'order_update' | 'shipping_update' | 'delivery_complete' | 'password_reset' | 'welcome';
}

// Email templates
const emailTemplates = {
  order_confirmation: {
    subject: 'Order Confirmation - Terra & Table',
    body: (data: any) => `
      <h1>Thank you for your order!</h1>
      <p>Hi ${data.userName},</p>
      <p>Your order #${data.orderId.slice(-6).toUpperCase()} has been confirmed.</p>
      <p><strong>Order Total:</strong> $${data.total.toFixed(2)}</p>
      <p><strong>Items:</strong> ${data.itemCount} item(s)</p>
      <p>We'll notify you when your order ships.</p>
      <p>Thank you for shopping with Terra & Table!</p>
    `
  },
  order_update: {
    subject: 'Order Update - Terra & Table',
    body: (data: any) => `
      <h1>Order Status Update</h1>
      <p>Hi ${data.userName},</p>
      <p>Your order #${data.orderId.slice(-6).toUpperCase()} status has been updated.</p>
      <p><strong>New Status:</strong> ${data.status.replace('_', ' ').toUpperCase()}</p>
      <p>You can track your order in your account dashboard.</p>
      <p>Thank you for shopping with Terra & Table!</p>
    `
  },
  shipping_update: {
    subject: 'Your Order Has Shipped! - Terra & Table',
    body: (data: any) => `
      <h1>Your order is on the way!</h1>
      <p>Hi ${data.userName},</p>
      <p>Great news! Your order #${data.orderId.slice(-6).toUpperCase()} has shipped.</p>
      ${data.trackingNumber ? `<p><strong>Tracking Number:</strong> ${data.trackingNumber}</p>` : ''}
      <p><strong>Estimated Delivery:</strong> ${data.estimatedDelivery || '2-3 business days'}</p>
      <p>You can track your order in your account dashboard.</p>
      <p>Thank you for shopping with Terra & Table!</p>
    `
  },
  delivery_complete: {
    subject: 'Order Delivered - Terra & Table',
    body: (data: any) => `
      <h1>Your order has been delivered!</h1>
      <p>Hi ${data.userName},</p>
      <p>Your order #${data.orderId.slice(-6).toUpperCase()} has been delivered.</p>
      <p>We hope you enjoy your artisan foods!</p>
      <p>If you have any questions, please contact our support team.</p>
      <p>Thank you for shopping with Terra & Table!</p>
    `
  },
  welcome: {
    subject: 'Welcome to Terra & Table!',
    body: (data: any) => `
      <h1>Welcome to Terra & Table!</h1>
      <p>Hi ${data.userName},</p>
      <p>Thank you for creating an account with us!</p>
      <p>As a welcome gift, use code <strong>WELCOME10</strong> for 10% off your first order.</p>
      <p>Start exploring our curated collection of artisan foods from around the world.</p>
      <p>Happy shopping!</p>
      <p>The Terra & Table Team</p>
    `
  }
};

// Send email notification
export async function sendEmailNotification(notification: EmailNotification): Promise<boolean> {
  try {
    // In production, integrate with email service (SendGrid, Mailgun, etc.)
    // For now, we'll log the email and store it in database
    
    const { error } = await supabase
      .from('email_notifications')
      .insert({
        to: notification.to,
        subject: notification.subject,
        body: notification.body,
        type: notification.type,
        sent_at: new Date().toISOString(),
        status: 'sent'
      });

    if (error) {
      console.error('Failed to send email notification:', error);
      return false;
    }

    console.log('Email notification sent:', notification);
    return true;
  } catch (error) {
    console.error('Error sending email notification:', error);
    return false;
  }
}

// Send order confirmation email
export async function sendOrderConfirmationEmail(order: any, user: any): Promise<boolean> {
  const template = emailTemplates.order_confirmation;
  
  return sendEmailNotification({
    to: user.email,
    subject: template.subject,
    body: template.body({
      userName: user.full_name || user.name,
      orderId: order.id,
      total: order.total,
      itemCount: order.items?.length || 0
    }),
    type: 'order_confirmation'
  });
}

// Send order update email
export async function sendOrderUpdateEmail(order: any, user: any): Promise<boolean> {
  const template = emailTemplates.order_update;
  
  return sendEmailNotification({
    to: user.email,
    subject: template.subject,
    body: template.body({
      userName: user.full_name || user.name,
      orderId: order.id,
      status: order.status
    }),
    type: 'order_update'
  });
}

// Send shipping update email
export async function sendShippingUpdateEmail(order: any, user: any): Promise<boolean> {
  const template = emailTemplates.shipping_update;
  
  return sendEmailNotification({
    to: user.email,
    subject: template.subject,
    body: template.body({
      userName: user.full_name || user.name,
      orderId: order.id,
      trackingNumber: order.tracking_number,
      estimatedDelivery: '2-3 business days'
    }),
    type: 'shipping_update'
  });
}

// Send delivery complete email
export async function sendDeliveryCompleteEmail(order: any, user: any): Promise<boolean> {
  const template = emailTemplates.delivery_complete;
  
  return sendEmailNotification({
    to: user.email,
    subject: template.subject,
    body: template.body({
      userName: user.full_name || user.name,
      orderId: order.id
    }),
    type: 'delivery_complete'
  });
}

// Send welcome email
export async function sendWelcomeEmail(user: any): Promise<boolean> {
  const template = emailTemplates.welcome;
  
  return sendEmailNotification({
    to: user.email,
    subject: template.subject,
    body: template.body({
      userName: user.full_name || user.name
    }),
    type: 'welcome'
  });
}
